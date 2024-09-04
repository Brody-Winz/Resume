document.addEventListener("DOMContentLoaded", function() {
    // When the page loads, hide all the paragraphs inside sections
    document.querySelectorAll('section p').forEach(p => {
        p.style.display = 'none'; 
    });

    // Add hover effect to sections so the paragraphs show up when you hover over them
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.querySelector('p').style.display = 'block'; // Show paragraph when mouse enters section
        });
        section.addEventListener('mouseleave', () => {
            section.querySelector('p').style.display = 'none'; // Hide paragraph when mouse leaves section
        });
    });

    // Add functionality to <strong> tags to work like dropdowns
    document.querySelectorAll('strong').forEach(strong => {
        // If the next element isn't a span, wrap all the following text and <br> tags in a span
        if (!strong.nextElementSibling || strong.nextElementSibling.tagName !== 'SPAN') {
            const nextNodes = [];
            let next = strong.nextSibling;

            // Collect all text nodes and <br> until we hit the next <strong> or header
            while (next && !(next.nodeType === Node.ELEMENT_NODE && (next.tagName === 'STRONG' || next.tagName === 'H3'))) {
                nextNodes.push(next); // Add the nodes to the list
                next = next.nextSibling; // Move to the next sibling node
            }

            if (nextNodes.length) {
                const span = document.createElement('span'); 
                nextNodes.forEach(node => span.appendChild(node)); // Put the collected nodes into the span
                span.style.display = 'none'; // Hide the span initially
                strong.after(span); // Insert the span after the strong element
            }
        }

        // Make the strong tag toggle the visibility of the span when clicked
        strong.addEventListener('click', function() {
            const details = strong.nextElementSibling; // Get the span element that comes after
            if (details && details.tagName === 'SPAN') {
                details.style.display = details.style.display === 'none' ? 'block' : 'none'; // Toggle visibility
                strong.classList.toggle('expanded'); // Change the arrow direction by toggling a class
            }
        });
    });
});
