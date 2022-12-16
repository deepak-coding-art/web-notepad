// Get editor area
const textarea = document.getElementById("editor");

// ---------------------------------------------------------- Get all the short buttons ----------------------------------------------------------
const newBtn = document.getElementById("new-short-btn");
const openBtn = document.getElementById("open-short-btn");
const saveBtn = document.getElementById("save-short-btn");
const printBtn = document.getElementById("print-short-btn");
const cutBtn = document.getElementById("cut-short-btn");
const copyBtn = document.getElementById("copy-short-btn");
const pasteBtn = document.getElementById("paste-short-btn");
const shareBtn = document.getElementById("share-short-btn");
const undoBtn = document.getElementById("undo-short-btn");
const redoBtn = document.getElementById("redo-short-btn");

// ---------------------------------------------------------- Config vars ---------------------------------------------------
const acceptedFileTypes = ["text/html", "text/plain"];

// ---------------------------------------------------------- Button event listeners ----------------------------------------------------------
// copy event
copyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  copyText();
});

// cut event
cutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cutText();
});

// paste event
pasteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  pasteText();
});

// print event
printBtn.addEventListener("click", (e) => {
  e.preventDefault();
  printText();
});

// undo event
undoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  undoText();
});

// redo event
redoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  redoText();
});

// save event
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  saveToTextFile();
});

// load text file event
openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openFile();
});

// create new document event
newBtn.addEventListener("click", (e) => {
  e.preventDefault();
  createNew();
});

// share event
shareBtn.addEventListener("click", (e) => {
  e.preventDefault();
  shareLink();
});

// ---------------------------------------------------------- Object for storing data ----------------------------------------------------------
const state = {};
const maxUndoStack = 50;
const history = {
  currentIndex: 0,
  states: [],
};

// ---------------------------------------------------------- Event listener on text area ----------------------------------------------------------
// Text area history events
textarea.addEventListener("input", (e) => {
  saveHistory(e.target.value, [textarea.selectionStart, textarea.selectionEnd]);
});
// textarea.onselect = selectText;

// // Add selection coordinates to state
// function selectText(e) {
//   alert(
//     e.target.value.substring(e.target.selectionStart, e.target.selectionEnd)
//   );
// }

// ---------------------------------------------------------- Functions for performing operations on text --------------------------------------------

// Check for selected text or not
function getSelectionCords() {
  if (textarea.selectionStart !== textarea.selectionEnd) {
    // Text is highlighted
    return [textarea.selectionStart, textarea.selectionEnd];
  } else {
    // Text is not highlighted
    return [];
  }
}
// copy the selected text
function copyText() {
  let cords = getSelectionCords();
  if (cords.length <= 0) {
    textarea.select();
    cords = getSelectionCords();
  }

  const text = textarea.value.substring(cords[0], cords[1]);
  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert("📋 Copied! to clipboard"); // success
    })
    .catch(function () {
      alert("😞 Sorry something went wrong"); // error
    });
  textarea.focus();
  textarea.setSelectionRange(cords[0], cords[1]);
}

// Cut the selected tex
function cutText() {
  let cords = getSelectionCords();
  if (cords.length <= 0) return;

  const text = textarea.value.substring(cords[0], cords[1]);
  textarea.setRangeText("", cords[0], cords[1], "start");
  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert("📋 Copied! to clipboard"); // success
    })
    .catch(function () {
      alert("😞 Sorry something went wrong"); // error
    });
  textarea.focus();
}

// Paste text from clipboard
async function pasteText() {
  textarea.focus();
  try {
    const permission = await navigator.permissions.query({
      name: "clipboard-read",
    });
    if (permission.state === "denied") {
      throw new Error("Not allowed to read clipboard.");
    }
    const clipboardContents = await navigator.clipboard.readText();
    textarea.setRangeText(
      clipboardContents,
      textarea.selectionStart,
      textarea.selectionEnd,
      "start"
    );
    textarea.setSelectionRange(
      textarea.selectionStart,
      textarea.selectionStart + clipboardContents.length
    );
  } catch (error) {
    alert(error.message);
    console.error(error.message);
  }
}

// Print text from text area
function printText() {
  let childWindow = window.open(
    "",
    "childWindow",
    "location=yes, menubar=yes, toolbar=yes"
  );
  childWindow.document.open();
  childWindow.document.write("<html><head></head><body>");
  childWindow.document.write(
    document.getElementById("editor").value.replace(/\n/gi, "<br>")
  );
  childWindow.document.write("</body></html>");
  childWindow.print();
  childWindow.document.close();
  childWindow.close();
  textarea.focus();
}

// Save history
function saveHistory(value, cords, commands = {}) {
  let lastIndexOfStates = history.states.length - 1;
  if (lastIndexOfStates === -1) lastIndexOfStates = 0;

  if (history.currentIndex === lastIndexOfStates) {
    history.states.push({ value, cords, commands });
  } else {
    history.states.splice(history.currentIndex);
    history.states.push({ value, cords, commands });
  }
  if (lastIndexOfStates >= maxUndoStack) {
    history.states.shift();
  }

  history.currentIndex = history.states.length - 1;
}

// Undo text from text area
function undoText() {
  if (history.currentIndex > 0) {
    history.currentIndex--;
    const { value, cords } = history.states[history.currentIndex];
    textarea.value = value;
    textarea.setSelectionRange(cords[0], cords[1]);
    textarea.focus();
  }
}

// Redo text from text area
function redoText() {
  if (history.currentIndex < history.states.length - 1) {
    history.currentIndex++;
    const { value, cords } = history.states[history.currentIndex];
    textarea.value = value;
    textarea.setSelectionRange(cords[0], cords[1]);
    textarea.focus();
  }
}

// Save text from text are in to a text file
function saveToTextFile() {
  // ask the user for the desired file name
  const fileName = window.prompt(
    "Enter a file name:",
    `document-${Math.ceil(Math.random() * 100000)}.txt`
  );

  if (fileName) {
    // create a blob from the text
    const blob = new Blob([textarea.value], { type: "text/plain" });

    // create a URL for the blob
    const url = URL.createObjectURL(blob);

    // create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // add the link to the DOM
    document.body.appendChild(link);

    // click the link to trigger the download
    link.click();

    // remove the link from the DOM
    document.body.removeChild(link);
  }

  textarea.focus();
}

// Open a file from users pc
function openFile() {
  // create string of all accepted file types
  let fileTypes = "";
  acceptedFileTypes.forEach((type) => {
    fileTypes += `${type},`;
  });
  // create a file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = fileTypes;

  // add the file input to the DOM
  document.body.appendChild(fileInput);

  // trigger the file input's click event to open the file picker
  fileInput.click();

  // remove the file input from the DOM
  document.body.removeChild(fileInput);

  fileInput.addEventListener("change", () => {
    // get the selected file
    const file = fileInput.files[0];

    // Check file type
    let isAccepted = false;
    acceptedFileTypes.forEach((type) => {
      if (file.type === type) {
        isAccepted = true;
      }
    });
    if (!isAccepted) return;
    // create a FileReader to read the file
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = function () {
      // update the editor's content with the file's contents
      textarea.value = reader.result;
    };
  });
}

// Create new document
function createNew() {
  var response = confirm("All old text will be deleted. Are you sure?");
  if (response == true) {
    // the user clicked "OK"
    createNewDocument();
  } else {
    // the user clicked "Cancel"
    return;
  }
}

// Clear all data from editor and clear all undo history
function createNewDocument() {
  textarea.value = "";
  history.states = [
    {
      value: textarea.value,
      cords: [textarea.selectionStart, textarea.selectionEnd],
      commands: {},
    },
  ];
  history.currentIndex = history.states.length;
}

// Share the page link
function shareLink() {
  navigator
    .share({
      title: "Web Notepad",
      text: "Check out this awesome text editor!",
      url: `${window.location.href}`,
    })
    .then(() => {})
    .catch((error) => {});
}

// -------------------------------------------- On Starting (Window event listers) --------------------------------------------
window.addEventListener("load", (event) => {
  history.states.push({
    value: textarea.value,
    cords: [textarea.selectionStart, textarea.selectionEnd],
    commands: {},
  });
  history.currentIndex = history.states.length;
});
