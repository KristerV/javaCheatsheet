var elementScrolls = []

function insertMarkdownToDocument(content) {
	var md = window.markdownit({
		breaks: true,
		linkify: true,
	})
		.use(markdownItTOC)
		.use(window.markdownItAttrs)
		.use(MarkdownItVideo, {})
		.use(window.markdownitContainer, "toc");
	var result = md.render(content);
	$('body').append(result);

	// Stuff that needs next render
	setTimeout(function(){

		// Highlight code - heavy calculation
		hljs.initHighlighting()

		// Scroll to position
		if (document.location.hash.length)
			window.scrollTo(0, $(document.location.hash).offset().top)
		refreshTOC()
	}, 300);

}

// Get markdown file
$.get('content.md').done(insertMarkdownToDocument);
