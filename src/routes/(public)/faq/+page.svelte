<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion";
</script>

<div class="container mx-auto">
    <h2
        class="scroll-m-20 border-b pb-4 text-3xl text-center font-semibold tracking-tight transition-colors first:mt-0"
    >
        What can you do with this application?
    </h2>
    <Accordion.Root class="py-8 w-full mx-auto sm:max-w-[70%]">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
            <Accordion.Content
                >Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content
            >
        </Accordion.Item>
        <Accordion.Item value="item-2">
            <Accordion.Trigger>Is it styled?</Accordion.Trigger>
            <Accordion.Content>
                Yes. It comes with default styles that matches the other
                components' aesthetic.
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
            <Accordion.Trigger>Is it animated?</Accordion.Trigger>
            <Accordion.Content>
                Yes. It's animated by default, but you can disable it if you
                prefer.
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
