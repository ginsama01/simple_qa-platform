<script>
  import { getOneQuestion } from "../api/questions.js";
  import { getAllAnswers, postAnswer } from "../api/answers.js";
  import { postUpvote, getAnswerUpvote } from "../api/upvote.js";
  import { userUuid } from "../stores/stores.js";
  import { onMount } from "svelte";
  import AlertModal from "./AlertModal.svelte";

  let id = localStorage.getItem("questionId") || "";

  let question;
  let answers;
  let visibleAnswers = [];
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
      if (loadCount < answers.length) {
        loadCount += 20;
        visibleAnswers = [];
        for (let i = 0; i < Math.min(answers.length, loadCount); ++i) {
          visibleAnswers.push(answers[i]);
        }
      }
    }
  }

  const createSocketConnection = () => {
    const host = window.location.host;
    console.log(host);
    ws = new WebSocket("ws://" + host + "/api/ws");

    ws.onmessage = async (event) => {
      if (event.data == "Update answer") {
        answers = await getAllAnswers(id);
        visibleAnswers = [];
        for (let i = 0; i < Math.min(answers.length, loadCount); ++i) {
          visibleAnswers.push(answers[i]);
        }
      }
    };

    return;
  };

  onMount(async () => {
    question = await getOneQuestion(id);
    answers = await getAllAnswers(id);
    loadCount = 20;
    for (let i = 0; i < Math.min(answers.length, loadCount); ++i) {
      visibleAnswers.push(answers[i]);
    }

    const upvote = await getAnswerUpvote(id, $userUuid);
    if (upvote.answer_id) {
      upvoteId = upvote.answer_id;
      console.log(upvoteId);
    }
    window.addEventListener("scroll", handleScroll);
    createSocketConnection();
  });

  const submitAddAnswer = async () => {
    const data = {
      questionId: question.id,
      content: content,
      uuid: $userUuid,
    };
    const response = await postAnswer(data);
    if (response.status == 201) {
      modalStatus = 1;
    } else {
      modalStatus = 0;
    }
    modalMessage = response.message;
    showSubmitModal = true;
    answers = await getAllAnswers(id);
    visibleAnswers = [];
    for (let i = 0; i < Math.min(answers.length, loadCount); ++i) {
      visibleAnswers.push(answers[i]);
    }
    content = "";
  };

  const submitUpvoteAnswer = async (answer) => {
    const data = {
      answerId: answer.id,
      id: id,
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
</script>

{#if question}
  <div class="mx-auto my-auto text-center bg-white p-4 rounded shadow-lg mt-6">
    <h1 class="text-3xl font-bold text-blue-600">{question.course.title}</h1>
    <p class="text-lg text-gray-700 mt-2 mb-6">{question.course.description}</p>
    <div class="mt-2 mb-6 border border-black rounded bg-green-100">
      <p class="text-2xl text-left text-gray-800 pt-2 pl-2">
        <strong>Question: </strong>{question.content}
      </p>
      <p class="text text-left text-gray-400 pb-2 pl-2">
        Posted by {question.user_uuid}
      </p>
    </div>
    <textarea
      bind:value={content}
      class="w-full h-20 border rounded p-2"
      placeholder="Write your answer here..."
    ></textarea>
    <button
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      on:click={() => submitAddAnswer()}
    >
      Add answer
    </button>
  </div>
  <AlertModal
    bind:showModal={showSubmitModal}
    bind:message={modalMessage}
    bind:modalStatus
    {closeModal}
  />
  {#if answers}
    <div>
      <ul class="space-y-4 my-4">
        {#each visibleAnswers as answer}
          <li
            class="p-4 border rounded {upvoteId == answer.id
              ? 'border-yellow-600'
              : ''}"
          >
            <div class="flex justify-between">
              <span class="text-lg"
                ><strong>A: </strong>{answer.content}
                <br />
                <span class="text-sm text-gray-400"
                  >Posted by {answer.user_uuid}</span
                >
              </span>
              <span class="flex items-center space-x-2">
                <button
                  class="bg-green-500 text-white px-2 py-1 rounded"
                  on:click={() => submitUpvoteAnswer(answer)}>▲</button
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
