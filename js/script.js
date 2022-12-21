// Load library
window.jsPDF = window.jspdf.jsPDF;
const editor = ace.edit("editor");

// configure text the editor
editor.setFontSize(18);
editor.renderer.setShowGutter(false);
editor.setShowFoldWidgets(false);
editor.setOption("behavioursEnabled", ["cursorBox"]);

// Get vertical select button
const verticalSelectBtn = document.getElementById("vertical-toggle-button");

// toggle multiple select button
verticalSelectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleVerticalSelect();
});
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

// ---------------------------------------------------------- Get all the file option buttons -------------------------------------------------------
const newOption = document.getElementById("file-opt-new");
const openOption = document.getElementById("file-opt-open");
const saveOption = document.getElementById("file-opt-save");
const saveAsOption = document.getElementById("file-opt-save-as");
const saveAsPdfOption = document.getElementById("file-opt-save-as-pdf");
const printOption = document.getElementById("file-opt-print");
const shareOption = document.getElementById("file-opt-share");

// ---------------------------------------------------------- Get all the edit option buttons -------------------------------------------------------
const cutOption = document.getElementById("edit-opt-cut");
const copyOption = document.getElementById("edit-opt-copy");
const deleteOption = document.getElementById("edit-opt-delete");
const selectAllOption = document.getElementById("edit-opt-select-all");
const pasteOption = document.getElementById("edit-opt-paste");
const undoOption = document.getElementById("edit-opt-undo");
const redoOption = document.getElementById("edit-opt-redo");

// ---------------------------------------------------------- Get all the edit option buttons -------------------------------------------------------
const lineBreak = document.getElementById("dropdown-opt-auto-line-break");
const numberBar = document.getElementById("toggle-number-bar");
const toggleColorModeBtn = document.getElementById("toggleColorMode");

// lineBreak activator
lineBreak.addEventListener("click", (e) => {
  e.preventDefault();
  toggleAutoLineBreak();
});

// numberBar
numberBar.addEventListener("click", (e) => {
  e.preventDefault();
  toggleNumberBar();
});

// toggle mode
toggleColorModeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleColorMode();
});

// ---------------------------------------------------------- File Option button event listeners ----------------------------------------------------------
// save event
saveAsOption.addEventListener("click", (e) => {
  e.preventDefault();
  saveToTextFile();
});

// save event
saveOption.addEventListener("click", (e) => {
  e.preventDefault();
  saveText();
});

// load text file event
openOption.addEventListener("click", (e) => {
  e.preventDefault();
  openFile();
});

// create new document event
newOption.addEventListener("click", (e) => {
  e.preventDefault();
  createNew();
});

// share event
shareOption.addEventListener("click", (e) => {
  e.preventDefault();
  shareLink();
});

// print event
printOption.addEventListener("click", (e) => {
  e.preventDefault();
  printText();
});

// save as PDF event
saveAsPdfOption.addEventListener("click", (e) => {
  e.preventDefault();
  saveAsPDF();
});

// ---------------------------------------------------------- File Option button event listeners ----------------------------------------------------------
// copy event
copyOption.addEventListener("click", (e) => {
  e.preventDefault();
  copyText();
});

// cut event
cutOption.addEventListener("click", (e) => {
  e.preventDefault();
  cutText();
});

// paste event
pasteOption.addEventListener("click", (e) => {
  e.preventDefault();
  pasteText();
});

// undo event
undoOption.addEventListener("click", (e) => {
  e.preventDefault();
  undoText();
});

// redo event
redoOption.addEventListener("click", (e) => {
  e.preventDefault();
  redoText();
});

// delete event
deleteOption.addEventListener("click", (e) => {
  e.preventDefault();
  deleteText();
});

// selectAll event
selectAllOption.addEventListener("click", (e) => {
  e.preventDefault();
  selectAllText();
});

// ---------------------------------------------------------- Config vars ---------------------------------------------------
const acceptedFileTypes = ["text/html", "text/plain"];

// ---------------------------------------------------------- short button event listeners ----------------------------------------------------------
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
  saveText();
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
const state = {
  lineBreakIsOn: false,
  verticalSelectIsOn: false,
  showNumberBar: false,
  darkMode: false,
};

// ---------------------------------------------------------- Event listener on text area ----------------------------------------------------------
// Text area history events
editor.on("change", () => {
  saveHistory();
});

// ---------------------------------------------------------- Functions for performing operations on text --------------------------------------------

// copy the selected text
function copyText() {
  editor.focus();
  const text = editor.getSelectedText();
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert("📋 Copied! to clipboard"); // success
    })
    .catch(function () {
      alert("😞 Sorry something went wrong"); // error
    });
  editor.execCommand("copy");
}

// Cut the selected text
function cutText() {
  editor.focus();
  const text = editor.getSelectedText();
  if (!text) return;

  navigator.clipboard
    .writeText(text)
    .then(function () {
      alert("📋 Copied! to clipboard"); // success
    })
    .catch(function () {
      alert("😞 Sorry something went wrong"); // error
    });
  editor.execCommand("cut");
}

// delete selected text
function deleteText() {
  editor.focus();
  editor.execCommand("cut");
}

// select all text
function selectAllText() {
  editor.focus();
  editor.selectAll();
}

// Check if clipboard is allowed
function isClipboardReadingAllowed() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.permissions
        .query({ name: "clipboard-read" })
        .then(function (status) {
          resolve(status.state == "granted" || status.state == "prompt");
        });
    } catch (error) {
      reject(error);
    }
  });
}

// Paste text from clipboard
async function pasteText() {
  isClipboardReadingAllowed()
    .then(function (isAllowed) {
      if (isAllowed) {
        navigator.clipboard.read().then((data) => {
          for (let i = 0; i < data.length; i++) {
            if (data[i].types.includes("text/plain")) {
              data[i].getType("text/plain").then(function (blob) {
                blob.text().then(function (text) {
                  editor.session.insert(editor.getCursorPosition(), text);
                });
              });
            } else {
              console.log("Not text/plain to paste into the editor");
            }
          }
        });
      }
    })
    .catch(function (error) {
      console.log("cannot read clipboard", error);
    });
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
  childWindow.document.write(editor.getValue().replace(/\n/gi, "<br>"));
  childWindow.document.write("</body></html>");
  childWindow.print();
  childWindow.document.close();
  childWindow.close();
  editor.focus();
}

// ---------- LocalStorage Cache ------------

// Save history
function saveHistory() {
  localStorage.setItem("history", editor.getValue());
}

// Get history
function getHistory() {
  return localStorage.getItem("history");
}

// Undo text from text area
function undoText() {
  editor.execCommand("undo");
  editor.focus();
}

// Redo text from text area
function redoText() {
  editor.execCommand("redo");
  editor.focus();
}

// Save text from text are in to a text file
function saveToTextFile() {
  // check if file is empty
  if (!editor.getValue())
    return alert("This file is empty please enter some text first");

  // ask the user for the desired file name
  const fileName = window.prompt(
    "Enter a file name:",
    `document-${Math.ceil(Math.random() * 100000)}.txt`
  );

  if (fileName) {
    // create a blob from the text
    const blob = new Blob([editor.getValue()], { type: "text/plain" });

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

  editor.focus();
}

// save quickly
function saveText() {
  // check if file is empty
  if (!editor.getValue())
    return alert("This file is empty please enter some text first");

  // create a blob from the text
  const blob = new Blob([editor.getValue()], { type: "text/plain" });

  // create a URL for the blob
  const url = URL.createObjectURL(blob);

  // create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = `document-${Math.ceil(Math.random() * 100000)}.txt`;

  // add the link to the DOM
  document.body.appendChild(link);

  // click the link to trigger the download
  link.click();

  // remove the link from the DOM
  document.body.removeChild(link);

  editor.focus();
}

// Open a file from users pc
function openFile() {
  editor.focus();
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
      editor.setValue(reader.result);
      // remove all undo redo stack
      editor.getSession().getUndoManager().reset();
    };
  });
}

// Create new document
function createNew() {
  editor.focus();
  let response = confirm("All old text will be deleted. Are you sure?");
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
  editor.setValue("");
  editor.getSession().getUndoManager().reset();
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

// Save as pdf
function saveAsPDF() {
  const fileName = window.prompt(
    "Enter a file name:",
    `document-${Math.ceil(Math.random() * 100000)}.pdf`
  );
  if (fileName) {
    const doc = new jsPDF({ lineHeight: 0.5 });

    // Set the font size and line height
    doc.setFontSize(12);
    // Set the maximum width for the text
    const maxWidth = 180;

    // Set the initial y-position for the text
    let y = 10;

    // Split the text into an array of substrings that fit within the maximum width
    const text = editor.getValue();
    const lines = doc.splitTextToSize(text, maxWidth);

    // Add the text to the PDF file, starting a new page if the current page is full
    lines.forEach((line) => {
      // Check if the current y-position plus the line height exceeds the page height
      if (y + doc.getLineHeight() > doc.internal.pageSize.height) {
        // Add a new page
        doc.addPage();

        // Reset the y-position to the top of the page
        y = 10;
      }

      // Add the line of text to the PDF file
      doc.text(line, 10, y, { maxWidth });

      // Increment the y-position by the line height
      y += doc.getLineHeight();
    });

    doc.save(fileName);
  }
  return;
}

// toggle auto line break
function toggleAutoLineBreak() {
  if (state.lineBreakIsOn) {
    editor.setOptions({
      wrap: false,
    });
    lineBreak.innerHTML = `auto line-break`;
    state.lineBreakIsOn = false;
  } else {
    editor.setOptions({
      wrap: true,
    });
    lineBreak.innerHTML = `<img src="./assets/icons/check.png" alt="check" class="check" /> auto line-break`;
    state.lineBreakIsOn = true;
  }
}

// Toggle multiline mode
function toggleVerticalSelect() {
  const status = document.getElementById("vertical-toggle-status");
  if (state.verticalSelectIsOn) {
    status.innerHTML = "OFF";
    verticalSelectBtn.classList.remove("vertical-active");
    verticalSelectBtn.classList.add("vertical-enactive");
    state.verticalSelectIsOn = false;
    selectMultiLines();
    editor.focus();
  } else {
    status.innerHTML = "ON";
    verticalSelectBtn.classList.add("vertical-active");
    verticalSelectBtn.classList.remove("vertical-enactive");
    state.verticalSelectIsOn = true;
    selectMultiLines();
    editor.blur();
  }
}

// Select multiple lines
function selectMultiLines() {
  editor._eventRegistry.mousedown[1] = (
    (func) => (e) =>
      func({
        ...e,
        ...e.__proto__,
        getButton: () => e.getButton(),
        domEvent: {
          ...e.domEvent,
          altKey: !e.domEvent.altKey,
          shiftKey: e.domEvent.shiftKey,
          ctrlKey: e.domEvent.ctrlKey,
        },
      })
  )(editor._eventRegistry.mousedown[1]);
}

// clipboard check
function isClipboardWritingAllowed() {
  return new Promise(function (resolve, reject) {
    try {
      navigator.permissions
        .query({ name: "clipboard-write" })
        .then(function (status) {
          // PermissionStatus object
          // {
          //  onchange: null,
          //  state: "granted" (it could be as well `denied` or `prompt`)
          // }
          console.log(status);

          resolve(status.state == "granted");
        });
    } catch (error) {
      // This could be caused because of a Browser incompatibility or security error
      // Remember that this feature works only through HTTPS
      reject(error);
    }
  });
}

// toggle number bar
function toggleNumberBar() {
  const text = document.getElementById("lineNumberState");
  if (!state.showNumberBar) {
    console.log("trigger");
    editor.renderer.setShowGutter(true);
    state.showNumberBar = true;
    text.innerHTML = "Hide";
  } else {
    editor.renderer.setShowGutter(false);
    state.showNumberBar = false;
    text.innerHTML = "Show";
  }
}

// toggle mode
function toggleColorMode() {
  const option1 = document.getElementById("option-1");
  const option2 = document.getElementById("option-2");
  const dropdown = document.getElementById("dropdown-menu");
  const editContainer = document.getElementById("editor");
  if (!state.darkMode) {
    document.body.classList.add("page-dark-mode");
    option1.classList.add("options-n-dark-mode");
    option2.classList.add("options-n-dark-mode");
    dropdown.classList.add("dropdown-menu-dark");
    editContainer.classList.add("editor-dark-mode");
    toggleColorModeBtn.innerHTML = "Light Mode";
    state.darkMode = true;
  } else {
    document.body.classList.remove("page-dark-mode");
    option1.classList.remove("options-n-dark-mode");
    option2.classList.remove("options-n-dark-mode");
    dropdown.classList.remove("dropdown-menu-dark");
    editContainer.classList.remove("editor-dark-mode");
    toggleColorModeBtn.innerHTML = "Dark Mode";
    state.darkMode = false;
  }
}

// -------------------------------------------- Multi cursor on mobile ------------------------------------------------
let selections = [];

editor.container.addEventListener("touchstart", function (e) {
  if (!state.verticalSelectIsOn) return;
  // Check for the presence of two touch points
  if (e.touches.length == 1) {
    // Get the touch position
    var touchX = e.touches[0].clientX;
    var touchY = e.touches[0].clientY;
    // Convert the touch position to a cursor position
    var cursorPos = editor.renderer.screenToTextCoordinates(touchX, touchY);
    // Set the selection ranges
    let selectionStart = { row: cursorPos.row, column: cursorPos.column };
    selections.push({ start: selectionStart, end: selectionStart });
  }
});

// Add an event listener for the "touchmove" event
editor.container.addEventListener("touchmove", function (e) {
  if (!state.verticalSelectIsOn) return;
  // Get the touch position
  var touchX = e.touches[0].clientX;
  var touchY = e.touches[0].clientY;
  // Convert the touch position to a cursor position
  var cursorPos = editor.renderer.screenToTextCoordinates(touchX, touchY);
  // Set the selection ranges
  selections.forEach((selection, index) => {
    selections[index].end = {
      row: selection.start.row,
      column: cursorPos.column,
    };
    if (cursorPos.row !== selection.start.row) {
      selections.push({
        start: { row: cursorPos.row, column: selection.start.column },
        end: { row: cursorPos.row, column: cursorPos.column },
      });
    }
  });
  editor.selection.fromJSON(selections);
});

// Add an event listener for the "touchend" event
editor.container.addEventListener("touchend", function (event) {
  if (!state.verticalSelectIsOn) return;
  // Reset the flag indicating that the selection is in progress
  selections = [];
});

// -------------------------------------------- On Starting (Window event listers) --------------------------------------------
window.addEventListener("load", (event) => {
  const oldCache = getHistory();
  editor.setValue(oldCache);
  editor.clearSelection();
  editor.focus();
});
