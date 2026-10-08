# Week 2 – Spec Kit Assignment Writeup

## 1. Spec Kit Commands and Prompts

For this assignment, I used GitHub Spec Kit to develop a simple **Quote of the Day** website using HTML, CSS, and JavaScript. The application displays random quotes, allows users to generate a new quote, and lets them add or remove quotes from their favorites. Favorite quotes are saved using localStorage.

**Agent:** Google Antigravity CLI (Gemini 3.8 Flash)

I followed the Spec Kit workflow using the following commands:

### Constitution
**Command:** `/speckit-constitution`

I established the project's main development principles, including simple and readable code, maintainability, accessibility, responsive design, and testing.

**Original prompt:**

> Create a constitution for my Week 2 Quote of the Day web app. Use plain HTML, CSS, and JavaScript only, with no backend or external frameworks. Keep the code simple, readable, and beginner-friendly. The app must show a random quote from a built-in list, provide a New Quote button, and allow users to toggle favorites that persist using localStorage. Prioritize accessibility, responsive design, and testing the required features. Follow the Spec Kit workflow and preserve all specification artifacts.

### Specify
**Command:** `/speckit-specify`

I defined the three main application features: displaying a random quote, generating a new quote, and managing favorites using localStorage.

**Original prompt:** No additional prompt — the command was run on its own, using the context from the constitution.

### Plan
**Command:** `/speckit-plan`

I created a technical plan for implementing the website using plain HTML, CSS, and JavaScript without a backend or external frameworks.

**Original prompt:** No additional prompt — the command was run on its own, using the context from the constitution.

### Tasks
**Command:** `/speckit-tasks`

I divided the implementation plan into smaller development tasks.

**Original prompt:** No additional prompt — the command was run on its own.

### Implement
**Command:** `/speckit-implement`

I implemented the planned features and tested the website in a browser.

**Original prompt:** No additional prompt — the command was run on its own.

### Converge
**Command:** `/speckit-converge`

I checked whether the implementation matched the specification, plan, and tasks. I repeated this check after refining the project.

**Original prompt:** No additional prompt — the command was run on its own.

## 2. Specification and Plan Refinement (Before and After)

### Before Refinement

The initial version of the application had four user stories and 28 tasks. Three user stories covered the main required features, while a fourth user story (US4) treated accessibility and responsive design as a separate feature.

The first implementation also used a dark navy and blue color palette. Although the website worked, I wanted a softer visual design.

### Refinement Prompt

> Update the existing Quote of the Day specification, plan, and tasks. Keep the feature scope focused on exactly three core user stories: (1) display a random quote on page load, (2) display a new random quote when the "New Quote" button is clicked, (3) allow users to toggle favorites and persist them across page reloads. Remove User Story 4 as a separate feature, but retain basic accessibility, responsive design, and testing as quality requirements supporting the three core features. Refine the visual design to use a soft powder pink and cream palette: cream background #FFF3ED, white quote card #FFFFFF, powder pink buttons and accents #D987A5, dark plum text #633E4E. Update the existing specification, implementation plan, and task list consistently. Do not create a new feature or modify the application code yet. Summarize the changes and explain which implementation tasks will be affected.

### After Refinement

I refined the specification and plan to focus on the three core user stories: displaying a random quote, generating a new quote, and managing favorites.

I removed US4 as a separate user story while keeping accessibility, responsive design, and testing as quality requirements. After reorganizing the tasks, the project contained **three user stories and 24 tasks**.

I also changed the design requirements to use a cream background, powder pink buttons and accents, and dark plum text.

Instead of directly editing the application code, I first updated the specification, plan, and task documents. Then I ran `/speckit-implement` again to apply the refined requirements.

This process showed me how changes to the specification and plan could directly affect the implementation, including both the project structure and the visual design.

## 3. Convergence Outcome

After the initial implementation, I ran `/speckit-converge` to check whether the application satisfied its requirements.

Following the refinement, I ran `/speckit-implement` and `/speckit-converge` again.

The final result was **Converged**, with **24 out of 24 tasks completed** and no remaining gaps between the specification, plan, tasks, and implementation.

I also opened the website in a browser and tested the New Quote button and favorites functionality.

## 4. Personal Reflection

At first, I had difficulty understanding how Spec Kit worked because I was following commands and approving actions without fully understanding what they did.

The most useful part for me was changing the website's design from dark colors to powder pink and cream tones. This helped me clearly see how changes to the requirements and plan affected the final application.

This assignment taught me that AI-augmented software engineering is not just about generating code. It also involves making decisions, reviewing the results, and testing whether the software meets the requirements.