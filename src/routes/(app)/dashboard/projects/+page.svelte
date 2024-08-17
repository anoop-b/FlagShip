<script lang="ts">
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator/index.js";
    import type { PageServerData } from "./$types";
  export let data: PageServerData;
</script>

<div class="flex flex-col gap-1 text-center">
  <div class="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
    {#each data.data as project}
      <Card.Root on:click={() => goto(`/dashboard/projects/${project.name}`)}>
        <Card.Header class="flex pb-2">
          <Card.Title class="text-2xl font-bold">{project.name}</Card.Title>
          <Separator />
        </Card.Header>
        <Card.Content class="flex space-x-4 justify-center">
          <p>Flags</p>
          <Separator orientation="vertical" />
          <div>{project.flags.length}</div>
        </Card.Content>
      </Card.Root>
    {/each}
  </div>
  <Button class="mt-4">Create Project</Button>
</div>
