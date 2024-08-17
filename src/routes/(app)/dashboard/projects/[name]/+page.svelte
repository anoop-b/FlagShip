<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>
<div>
    <p>{data.data[0].name}</p>
    <h1>{data.data[0].createdAt}</h1>
    <h1 class="text-2xl font-bold">{data.data[0].updatedAt}</h1>
</div>

