<script>
  import { getOneCourse } from "../api/courses.js";
  import { getAllQuestions, postQuestion } from "../api/questions.js";
  import { postUpvote, getQuestionUpvote } from "../api/upvote.js";
  import { userUuid } from "../stores/stores.js";
  import { onMount } from "svelte";
  import AlertModal from "./AlertModal.svelte";

  let id = localStorage.getItem("courseId") || "";

  let course;
  let questions;
  let visibleQuestions = [];
  let loadCount;
  let content;

  let ws;

  let upvoteId = -1;
  let showSubmitModal = false;
  let modalMessage = "";
  let modalStatus = 0;

  function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (loadCount < questions.length) {
        loadCount += 20;
        visibleQuestions = [];
        for (let i = 0; i < Math.min(questions.length, loadCount); ++i) {
          visibleQuestions.push(questions[i]);
        }
      }
    }
  }

  const createSocketConnection = () => {
    const host = window.location.host;
    console.log(host);
    ws = new WebSocket("ws://" + host + "/api/ws");

    ws.onmessage = async (event) => {
      if (event.data == "Update question") {
        questions = await getAllQuestions(id);
        visibleQuestions = [];
        for (let i = 0; i < Math.min(questions.length, loadCount); ++i) {
          visibleQuestions.push(questions[i]);
        }
      }
    };

    return;
  };

  onMount(async () => {
    const courses = await getOneCourse(id);
    if (courses.length == 1 && courses[0].id) {
      course = courses[0];
    }
    questions = await getAllQuestions(id);
    loadCount = 20;
    for (let i = 0; i < Math.min(questions.length, loadCount); ++i) {
      visibleQuestions.push(questions[i]);
    }

    const upvote = await getQuestionUpvote(id, $userUuid);
    if (upvote.question_id) {
      upvoteId = upvote.question_id;
      console.log(upvoteId);
    }
    window.addEventListener("scroll", handleScroll);
    createSocketConnection();
  });

  const submitAddQuestion = async () => {
    const data = {
      courseId: course.id,
      content: content,
      uuid: $userUuid,
    };
    const response = await postQuestion(data);
    if (response.status == 201) {
      modalStatus = 1;
    } else {
      modalStatus = 0;
    }
    modalMessage = response.message;
    showSubmitModal = true;
    questions = await getAllQuestions(id);
    visibleQuestions = [];
    for (let i = 0; i < Math.min(questions.length, loadCount); ++i) {
      visibleQuestions.push(questions[i]);
    }
    content = "";
  };

  const submitUpvoteQuestion = async (question) => {
    const data = {
      questionId: question.id,
      courseId: id,
      uuid: $userUuid,
    };
    const response = await postUpvote(data);
    if (response.status == 201) {
      modalStatus = 1;
    } else {
      modalStatus = 0;
    }
    modalMessage = response.message;
    showSubmitModal = true;
  };

  const closeModal = () => {
    showSubmitModal = false;
  };

  const openQuestionPage = async (id) => {
    localStorage.setItem("questionId", id);
    window.location.href = '/questions/';
  }

</script>

{#if course}
  <div class="mx-auto my-auto text-center bg-white p-4 rounded shadow-lg mt-6">
    <h1 class="text-3xl font-bold text-blue-600">{course.title}</h1>
    <p class="text-lg text-gray-700 mt-2 mb-6">{course.description}</p>
    <textarea
      bind:value={content}
      class="w-full h-20 border rounded p-2"
      placeholder="Write your question here..."
    ></textarea>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      on:click={() => submitAddQuestion()}
    >
      Add question
    </button>
  </div>
  <AlertModal
    bind:showModal={showSubmitModal}
    bind:message={modalMessage}
    bind:modalStatus
    {closeModal}
  />
  {#if questions}
    <div>
      <ul class="space-y-4 my-4">
        {#each visibleQuestions as question}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <li
            class="p-4 border rounded hover:bg-gray-100 cursor-pointer {upvoteId ==
            question.id
              ? 'border-yellow-600'
              : ''}"
            on:click={() => openQuestionPage(question.id)}
          >
            <div class="flex justify-between">
              <span class="text-lg"
                ><strong>Q: </strong>{question.content}
                <br />
                <span class="text-sm text-gray-400"
                  >Posted by {question.user_uuid}</span
                >
              </span>
              <span class="flex items-center space-x-2">
                <button
                  class="bg-green-500 text-white px-2 py-1 rounded"
                  on:click|stopPropagation={() =>
                    submitUpvoteQuestion(question)}>▲</button
                >
              </span>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
{:else}
  <p>Loading</p>
{/if}
