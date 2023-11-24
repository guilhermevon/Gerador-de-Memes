const memeForm = document.querySelector(".meme-generator form");
const memeImage = document.querySelector(".meme-generator img");
const topText = document.querySelector(".meme-generator .top-text");
const bottomText = document.querySelector(".meme-generator .bottom-text");
const generateMemeBtn = document.querySelector(".meme-generator .generate-meme-btn");

const getMemes = async () => {
  try {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();
    return data.data.memes;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getRandomMeme = async () => {
  const memes = await getMemes();
  if (memes.length > 0) {
    const randomIndex = Math.floor(Math.random() * memes.length);
    return memes[randomIndex];
  } else {
    return null;
  }
};

const generateMeme = async () => {
  const randomMeme = await getRandomMeme();
  if (randomMeme) {
    memeImage.setAttribute("src", randomMeme.url);
    topText.textContent = "";
    bottomText.textContent = "";
  } else {
    memeImage.setAttribute("src", "");
    topText.textContent = "Error: Failed to load meme";
    bottomText.textContent = "";
  }
};

memeForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

generateMemeBtn.addEventListener("click", generateMeme);

generateMeme();