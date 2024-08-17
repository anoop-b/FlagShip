<script lang="ts">
    export let data;
</script>

<div class="flex flex-col gap-4">
    <div class="grid gap-4 py-4 grid-cols-2">
        {#each data.data as flag}
            <div>
                <h1 class="text-xl">{flag.name}</h1>
                <h1>createdAt:{flag.createdAt}</h1>
            </div>
        {/each}
    </div>
</div>
