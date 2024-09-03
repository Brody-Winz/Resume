document.addEventListener("DOMContentLoaded", function() {
    // Hide all section paragraphs initially
    document.querySelectorAll('section p').forEach(p => {
        p.style.display = 'none';
    });

    // Add hover functionality to sections to reveal content
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.querySelector('p').style.display = 'block';
        });
        section.addEventListener('mouseleave', () => {
            section.querySelector('p').style.display = 'none';
        });
    });

    // Add dropdown functionality to <strong> elements
    document.querySelectorAll('strong').forEach(strong => {
        // Wrap subsequent text and <br> tags in a <span> element if not already wrapped
        if (!strong.nextElementSibling || strong.nextElementSibling.tagName !== 'SPAN') {
            const nextNodes = [];
            let next = strong.nextSibling;

            // Collect text nodes and <br> until the next <strong> or header
            while (next && !(next.nodeType === Node.ELEMENT_NODE && (next.tagName === 'STRONG' || next.tagName === 'H3'))) {
                nextNodes.push(next);
                next = next.nextSibling;
            }

            if (nextNodes.length) {
                const span = document.createElement('span');
                nextNodes.forEach(node => span.appendChild(node));
                span.style.display = 'none'; // Hide the span initially
                strong.after(span);
            }
        }

        // Toggle dropdown on click
        strong.addEventListener('click', function() {
            const details = strong.nextElementSibling; // The <span> element
            if (details && details.tagName === 'SPAN') {
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
                strong.classList.toggle('expanded');
            }
        });
    });
});
