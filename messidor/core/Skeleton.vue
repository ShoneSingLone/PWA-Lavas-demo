<template>
    <div class="skeleton-wrapper">
        <header class="skeleton-header"></header>
        <section class="skeleton-block">
            <skeletonImg/>
            <skeletonImg/>
            <skeletonImg/>
        </section>
    </div>
</template>

<script>
import skeletonImg from "@/components/SkeletonImg";

export default {
  name: "skeleton",
  components: {
    skeletonImg
  }
};
</script>

<style lang="stylus" scoped>
@import '~normalize.css';

.skeleton-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;

    .skeleton-header {
        height: 52px;
        background: #1976d2;
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12);
    }

    .skeleton-block {
        display: flex;
        flex-direction: column;
        padding-top: 8px;
    }
}
</style>
