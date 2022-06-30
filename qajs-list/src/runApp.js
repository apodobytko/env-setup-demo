/**
 *
 */
export function runApp(el) {
  el.innerHTML = `
    <div>
      <input />
      <button hidden>Add</button>
    </div>

    <div class="qa-history" data-testid="historyContainer">
      <p>1</p>
      <p>2</p>
      <p>3</p>
    </div>
  `;

  const button = el.querySelector("button");
  const input = el.querySelector("input");
  const historyContainer = el.querySelector('[data-testid="historyContainer"]');

  input.addEventListener("input", (ev) => {
    button.hidden = !Boolean(input.value);
  });

  button.addEventListener("click", () => {
    const newP = document.createElement("p");
    newP.innerHTML = input.value;
    historyContainer.prepend(newP);

    input.value = "";
    button.hidden = true;

    const paragraphs = [...historyContainer.querySelectorAll("p")];
    if (paragraphs.length > 5) {
      paragraphs[5].remove();
    }
  });
}
