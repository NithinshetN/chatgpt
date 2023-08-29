let message = document.createElement("div");
message.classList.add("message");

const input = document.querySelector(".text");
const submit = document.querySelector(".submit");

const messageBox = document.querySelector(".messageBox");

const text = document.querySelector(".text");

text.addEventListener("keydown", (event) => {
    if ((event.keyCode === 13 || event.key === 'Enter')&&text.value!="") {
        let message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `<i class="fa-regular fa-user"></i><h6>${input.value}</h6>`;
        messageBox.appendChild(message);
        showSearchResult(input.value.trim());
        input.value = "";
    }
});

submit.addEventListener("click", () => {
    if(text.value!==""){
        let message = document.createElement("div");
        message.classList.add("message");
        message.innerHTML = `<i class="fa-regular fa-user"></i><h6>${input.value}</h6>`;
        messageBox.appendChild(message);
        showSearchResult(input.value.trim());
        input.value = "";
    }
})

function showSearchResult(searchData) {
    let message = document.createElement("div");
    message.classList.add("message");
    message.classList.add("colors");
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer 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");



    var raw = JSON.stringify({

        "model": "text-davinci-003",

        "prompt": `${searchData}`,

        "temperature": 1,

        "max_tokens": 256,

        "top_p": 1,

        "frequency_penalty": 0,

        "presence_penalty": 0

    });



    var requestOptions = {

        method: 'POST',

        headers: myHeaders,

        body: raw,

        redirect: 'follow'

    };

    fetch("https://api.openai.com/v1/completions", requestOptions)

        .then(response => response.json())

        .then(result => {

            choices = result.choices;

            let str = "";

            for (let i = 0; i < choices.length; i++) {

                str += `${choices[i].text}\n`;

            }
            message.innerHTML = `<i class="fa-solid fa-robot"></i><h6>${str}</h6>`;
            messageBox.appendChild(message);

        }).catch(error => console.log('error', error));



}
