<script lang="ts">
  import CircleUser from "lucide-svelte/icons/circle-user";
  import LineChart from "lucide-svelte/icons/chart-line";
  import Flag from "lucide-svelte/icons/flag";
  import Home from "lucide-svelte/icons/house";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import Menu from "lucide-svelte/icons/menu";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { PUBLIC_CLOUDFLARE_TEAM_DOMAIN } from "$env/static/public";
</script>

<div
  class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
>
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <Flag class="h-6 w-6" />
          <span class="">FlagShip</span>
        </a>
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <a
            href="/dashboard"
            class="bg-muted hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Home class="h-4 w-4" />
            Dashboard
          </a>
          <a
            href="/dashboard/projects"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <ShoppingCart class="h-4 w-4" />
            Projects
            <Badge
              class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
            >
              2
            </Badge>
          </a>
          <a
            href="##"
            class="text-muted-foreground hover:text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Flag class="h-4 w-4" />
            Flags
          </a>
          <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Users class="h-4 w-4" />
            Users
          </a>
          <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <LineChart class="h-4 w-4" />
            Environments
          </a>
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <header
      class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6"
    >
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
            builders={[builder]}
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <a href="/" class="flex items-center gap-2 text-lg font-semibold">
              <Flag class="h-6 w-6" />
              <span class="">FlagShip</span>
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Home class="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="/dashboard/projects"
              class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
            >
              <ShoppingCart class="h-4 w-4" />
              Projects
              <Badge
                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                2
              </Badge>
            </a>
            <a
              href="##"
              class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Flag class="h-5 w-5" />
              Flags
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Users class="h-5 w-5" />
              Users
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <LineChart class="h-5 w-5" />
              Environments
            </a>
          </nav>
          <div class="mt-auto">
            <Card.Root>
              <Card.Header>
                <Card.Title>Upgrade to Pro</Card.Title>
                <Card.Description>
                  Unlock all features and get unlimited access to our support
                  team.
                </Card.Description>
              </Card.Header>
              <Card.Content>
                <Button size="sm" class="w-full">Upgrade</Button>
              </Card.Content>
            </Card.Root>
          </div>
        </Sheet.Content>
      </Sheet.Root>
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search
              class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4"
            />
            <Input
              type="search"
              placeholder="Search products..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="secondary"
            size="icon"
            class="rounded-full"
          >
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item><a href="{PUBLIC_CLOUDFLARE_TEAM_DOMAIN}/cdn-cgi/access/logout">Logout</a></DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
      </div>
      <div
        class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div class="flex flex-col items-center gap-1 text-center">
          <slot />
        </div>
      </div>
    </main>
  </div>
</div>
