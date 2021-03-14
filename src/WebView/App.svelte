<script>
  function sendMessage() {
    vscode.postMessage({
      command: "sendingFromWebView",
      text: "some text to send from WebView",
    });
  }

  function receiveMessage(event) {
    switch (event.data.command) {
      case "sendingToWebView":
        console.log(event.data);
        break;
    }
  }
</script>

<svelte:window on:message={receiveMessage} />

<main>
  <h1>Hello World!</h1>
  <p>
    Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
    how to build Svelte apps.
  </p>
  <button on:click={sendMessage}>Send message</button>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
