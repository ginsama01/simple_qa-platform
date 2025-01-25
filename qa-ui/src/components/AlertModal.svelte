<script>
    export let showModal = false;
    export let message = "";
    export let modalStatus = 1;
    export let closeModal = () => {};
    console.log(modalStatus);
</script>

{#if showModal}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div class="bg-white p-6 rounded shadow-lg mx-auto my-auto text-center">
            <h2 class="text-2xl mb-4">{message}</h2>
            <button
                on:click={closeModal}
                class="{modalStatus == 1 ? "bg-green-500" : "bg-red-500"} text-white p-2 rounded mt-4">Close</button
            >
        </div>
    </div>
{/if}