<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
</script>
<div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">Projects</h1>
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no Projects</h3>
      <p class="text-muted-foreground text-sm">
        create a new project to add Flags 
      </p>
      <Button class="mt-4">Create Project</Button>
    </div>
  </div>