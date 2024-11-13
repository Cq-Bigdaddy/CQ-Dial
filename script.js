document.addEventListener("DOMContentLoaded", function () {
    const createWorkflowBtn = document.getElementById("createWorkflowBtn");
    const workflowContainer = document.getElementById("workflowContainer");
    const workflowNameHeader = document.getElementById("workflowName").querySelector("span");
    const saveWorkflowBtn = document.getElementById("saveWorkflowBtn");
    const workflowNameInput = document.getElementById("workflowNameInput");
    const optionsContainer = document.getElementById("optionsContainer");

    // Define option lists for each main option
    const optionsMap = {
        Region: ["R1", "R2", "R3", "R4"],
        Category: ["C1", "C2", "C3", "C4"],
        Department: ["D1", "D2", "D3", "D4"],
        Status: ["S1", "S2", "S3", "S4"]
    };

    // Save workflow name, show containers, and hide modal
    saveWorkflowBtn.addEventListener("click", function () {
        const workflowName = workflowNameInput.value.trim();
        if (workflowName) {
            workflowNameHeader.textContent = workflowName;
            workflowContainer.classList.remove("d-none");
            createWorkflowBtn.classList.add("d-none");
            workflowNameInput.value = ''; 

            const workflowModal = bootstrap.Modal.getInstance(document.getElementById('workflowModal'));
            workflowModal.hide();
        } else {
            workflowNameInput.classList.add('is-invalid'); 
        }
    });

    // Clear validation style on input change
    workflowNameInput.addEventListener('input', function () {
        if (workflowNameInput.classList.contains('is-invalid')) {
            workflowNameInput.classList.remove('is-invalid');
        }
    });

    // Handle main option click to add specific options in the right container only when dropdown is open
    document.querySelectorAll(".accordion-button.main-option").forEach(function (mainOption) {
        mainOption.addEventListener("click", function () {
            const mainOptionText = mainOption.textContent.trim();
            const selectedOptions = optionsMap[mainOptionText] || [];

            // Check if the dropdown is now open
            const isExpanded = mainOption.getAttribute("aria-expanded") === "true";

            if (isExpanded) {
                // Only create main option container and options when dropdown opens
                let mainOptionContainer = document.getElementById(`container-${mainOptionText}`);
                if (!mainOptionContainer) {
                    mainOptionContainer = document.createElement("div");
                    mainOptionContainer.className = "main-option-container horizontal-box";
                    mainOptionContainer.id = `container-${mainOptionText}`;

                    const header = document.createElement("div");
                    header.className = "main-option-header";
                    header.textContent = mainOptionText;

                    const removeIcon = document.createElement("span");
                    removeIcon.className = "remove-main-option";
                    removeIcon.innerHTML = "&times;";
                    removeIcon.addEventListener("click", function () {
                        mainOptionContainer.remove();
                    });

                    header.appendChild(removeIcon);
                    mainOptionContainer.appendChild(header);

                    optionsContainer.appendChild(mainOptionContainer);
                }

                selectedOptions.forEach(function (option) {
                    if (!document.getElementById(`option-${option}`)) {
                        const badge = document.createElement("div");
                        badge.className = "option-badge";
                        badge.id = `option-${option}`;
                        badge.textContent = option;

                        const removeIcon = document.createElement("span");
                        removeIcon.className = "remove-option";
                        removeIcon.innerHTML = "&times;";
                        removeIcon.addEventListener("click", function () {
                            badge.remove();
                        });

                        badge.appendChild(removeIcon);
                        mainOptionContainer.appendChild(badge);
                    }
                });
            }
        });
    });

    // Handle sidebar sub-options to add them in a row below the corresponding main options
    document.querySelectorAll(".sub-option").forEach(function (subOption) {
        subOption.addEventListener("click", function (e) {
            e.preventDefault();

            const option = subOption.textContent.trim();
            const mainOption = subOption.closest(".accordion-item").querySelector(".main-option");
            const mainOptionText = mainOption ? mainOption.textContent.trim() : null;

            if (mainOptionText) {
                let mainOptionContainer = document.getElementById(`container-${mainOptionText}`);
                if (!mainOptionContainer) {
                    mainOptionContainer = document.createElement("div");
                    mainOptionContainer.className = "main-option-container horizontal-box";
                    mainOptionContainer.id = `container-${mainOptionText}`;

                    const header = document.createElement("div");
                    header.className = "main-option-header";
                    header.textContent = mainOptionText;

                    const removeIcon = document.createElement("span");
                    removeIcon.className = "remove-main-option";
                    removeIcon.innerHTML = "&times;";
                    removeIcon.addEventListener("click", function () {
                        mainOptionContainer.remove();
                    });

                    header.appendChild(removeIcon);
                    mainOptionContainer.appendChild(header);
                    optionsContainer.appendChild(mainOptionContainer);
                }

                let subOptionsContainer = mainOptionContainer.querySelector(".sub-options-container");
                if (!subOptionsContainer) {
                    subOptionsContainer = document.createElement("div");
                    subOptionsContainer.className = "sub-options-container";
                    mainOptionContainer.appendChild(subOptionsContainer);
                }

                if (!document.getElementById(`option-${option}`)) {
                    const badge = document.createElement("div");
                    badge.className = "option-badge sub-option-badge";
                    badge.id = `option-${option}`;
                    badge.textContent = option;

                    const removeIcon = document.createElement("span");
                    removeIcon.className = "remove-option";
                    removeIcon.innerHTML = "&times;";
                    removeIcon.addEventListener("click", function () {
                        badge.remove();
                    });

                    badge.appendChild(removeIcon);
                    subOptionsContainer.appendChild(badge);
                }
            }
        });
    });
});
