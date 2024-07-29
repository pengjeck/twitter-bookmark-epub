import { EPub } from "@lesjoursfr/html-to-epub"

var data = `<p>Author: SpaceX</p>
<p>At dawn from the gateway to Mars, the launch of Starship’s second flight test</p>
<div>
  <image src="https://pbs.twimg.com/ext_tw_video_thumb/1732820284301058052/pu/img/A-6jgWgxmMJ43_YO.jpg"></image>
</div>
<a href="https://x.com/SpaceX/status/1732824684683784516">Source</a>`

var option = {
  title: "My Ebook",
  author: "Alice",
  publisher: "Les Jours Fr.",
  version: "3",
  tocTitle: "Table of Contents",
  content: [{title: "Chapter One", data: data}]
};

const epub = new EPub(option, "output_file.epub");
epub.render()
	.then(() => {
		console.log("Ebook Generated Successfully!");
	})
	.catch((err) => {
		console.error("Failed to generate Ebook because of ", err);
	});