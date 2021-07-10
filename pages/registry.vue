<template>
  <div class="page registry">
    <h1>Registry</h1>
    <div class="page-content">
      <p>If you would like to give us a gift that is too big to put in a suitcase, please send the gift to the following address:</p>
      <address>
        Noah &amp; Katianne Grubb<br />
        267 W High St.<br />
        Hummelstown, PA 17036
      </address>
      <p>We are registered at the following stores:</p>
      <ul>
        <li>
          <a href="https://bit.ly/3dDrYwe" target="_blank" title="Crate &amp; Barrel Registry">Crate &amp; Barrel</a>
        </li>
        <li>
          <a href="https://bit.ly/372CJ8G" target="_blank" title="West Elm Registry">West Elm</a>
        </li>
        <li>
          <a href="https://bit.ly/3eSmyxn" target="_blank" title="Target Registry">Target</a>
        </li>
      </ul>
      <p>We also welcome gifts through Venmo: <strong>@n_grubb</strong> or <strong>@Katianne-Engle-1</strong>.</p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Katianne and Noah | Registry'
    }
  }
}
</script>

<style lang="scss">
.registry {
  font-size: 1.25em;

  ul {
    color: #E6B0A2;
    font-weight: bold;
    padding-left: 1.5rem;
    margin-bottom: 2rem;

    li {
      margin-top: 1rem;
    }

    a {
      color: black;

      &:hover {
        color: #E6B0A2;
      }
    }
  }

  address {
    font-size: 1.25rem;
    background: none;
  }
}
</style>
