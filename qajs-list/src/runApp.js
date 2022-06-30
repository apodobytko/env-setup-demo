/**
 *
 */

export function runApp(el) {
  /* eslint-disable-next-line no-param-reassign */
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

  const removeParagraph = (p) => {
    const item = p.srcElement || p;
    historyContainer.removeChild(item);
  };

  el.querySelectorAll(".qa-history p").forEach((p) => {
    p.addEventListener("click", () => {
      removeParagraph(p);
    });
  });

  input.addEventListener("input", (_ev) => {
    button.hidden = !input.value;
  });

  button.addEventListener("click", () => {
    const newP = document.createElement("p");
    newP.addEventListener("click", removeParagraph);
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
