<script>
  import { getAllCourses } from "../api/courses.js";
  import { onMount } from "svelte";

  let courses;

  onMount(async () => {
    courses = await getAllCourses();
  });

  console.log(courses);
</script>

{#if courses}
  <div>
    <h1 class="text-3xl font-bold text-center mb-6">Questions & Answers</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each courses as course}
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-xl font-semibold text-blue-600">{course.title}</h2>
          <p class="text-gray-600 mt-2">{course.description}</p>
          <a
            href={`/courses/${course.id}`}
            class="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            View Course
          </a>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Loading</p>
{/if}
