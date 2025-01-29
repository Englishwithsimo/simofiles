function checkAnswers(buttonElement) {
            const exerciseGroup = buttonElement.closest('.exercise-group');
            const groupId = exerciseGroup.getAttribute('data-group');
            const answers = exerciseGroup.querySelectorAll('.answer');
            let score = 0;
            let total = answers.length;

            const correctAnswers = exerciseAnswers[groupId];

            answers.forEach((element, index) => {
                const container = element.closest('p');
                const checkIcon = container.querySelector('.fa-check-circle');
                const crossIcon = container.querySelector('.fa-times-circle');
                
                // Reset icons
                checkIcon.classList.remove('visible');
                crossIcon.classList.remove('visible');
                
                // Handle both select and input elements
                const userAnswer = element.tagName === 'SELECT' ? element.value : element.value.trim().toLowerCase();
                const correctAnswer = correctAnswers[index].toLowerCase();
                
                if (userAnswer === correctAnswer) {
                    element.classList.remove('incorrect');
                    element.classList.add('correct');
                    checkIcon.classList.add('visible');
                    score++;
                } else {
                    element.classList.remove('correct');
                    element.classList.add('incorrect');
                    crossIcon.classList.add('visible');
                }
            });

            exerciseGroup.querySelector('.score').innerText = `Your score: ${score}/${total}`;
        }

        function clearAll(buttonElement) {
            const exerciseGroup = buttonElement.closest('.exercise-group');
            
            exerciseGroup.querySelectorAll('.answer').forEach(element => {
                if (element.tagName === 'SELECT') {
                    element.selectedIndex = 0;
                } else {
                    element.value = '';
                }
                element.classList.remove('correct', 'incorrect');
                
                const container = element.closest('p');
                container.querySelectorAll('.feedback-icon').forEach(icon => {
                    icon.classList.remove('visible');
                });
            });
            
            exerciseGroup.querySelector('.score').innerText = '';
        }