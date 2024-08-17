<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import { DollarSign, Users, CreditCard, Activity } from "lucide-svelte";
  export let data;
</script>

<div class="flex flex-col items-center gap-1 text-center">
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card.Root>
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-sm font-medium">Total Projects</Card.Title>
        <DollarSign class="text-muted-foreground h-4 w-4" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">{data.data.projects[0].count}</div>
        <p class="text-muted-foreground text-xs">+20.1% from last month</p>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-sm font-medium">Flags</Card.Title>
        <Users class="text-muted-foreground h-4 w-4" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">{data.data.flags[0].count}</div>
        <p class="text-muted-foreground text-xs">+180.1% from last month</p>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-sm font-medium">Sales</Card.Title>
        <CreditCard class="text-muted-foreground h-4 w-4" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">+12,234</div>
        <p class="text-muted-foreground text-xs">+19% from last month</p>
      </Card.Content>
    </Card.Root>
    <Card.Root>
      <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
      >
        <Card.Title class="text-sm font-medium">Active Now</Card.Title>
        <Activity class="text-muted-foreground h-4 w-4" />
      </Card.Header>
      <Card.Content>
        <div class="text-2xl font-bold">+573</div>
        <p class="text-muted-foreground text-xs">+201 since last hour</p>
      </Card.Content>
    </Card.Root>
  </div>
</div>
