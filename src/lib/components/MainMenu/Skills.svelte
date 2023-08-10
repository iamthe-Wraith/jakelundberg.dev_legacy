<script lang="ts">
  import type { ISkill } from "$lib/types/skills";
  import { getContext } from "svelte";

  const skills = getContext<ISkill[]>('skills');
</script>

<div class="skills">
  {#each (skills || []) as skill}
    <div class="skill">
      <p class="skill-name">{skill.name}</p>
    </div>
  {/each}
</div>