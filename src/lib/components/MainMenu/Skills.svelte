<script lang="ts">
	import { assets } from "$app/paths";
  import type { ISkill } from "$lib/types/skills";
  import { getContext } from "svelte";

  const skills = getContext<ISkill[]>('skills');
</script>

<div class="skills">
  {#each (skills || []) as skill}
    <div class="skill">
      <div class="skill-logo">
        <img src={`${assets}/skills/${skill.image}`} alt={`${skill.name} logo`} />
      </div>
      <div class="skill-details">
        <p class="skill-name">{skill.name}</p>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .skills {
    padding: 0 0 2rem;
    column-count: 1;

    @media (min-width: 768px) {
      padding: 0 1rem 2rem;
      column-count: 2;
    }
  }

  .skill {
    display: flex;

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    .skill-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      @media (min-width: 768px) {
        width: 4rem;
        height: 4rem;
      }
    }

    .skill-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
    }
  }
</style>