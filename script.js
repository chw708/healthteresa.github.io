(function() {
  const form = document.getElementById('riskForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let score = 0;

      // 1. Age
      const age = +document.getElementById('age').value;
      if (age > 65) score++;

      // 2. Family history
      const family = document.getElementById('familyHistory').value === 'yes';
      if (family) score++;

      // 3. Blood pressure
      const sbp = +document.getElementById('sbp').value;
      if (sbp >= 140) score++;
      const onTherapy = document.getElementById('onTherapy').checked;
      if (onTherapy) score++;

      // 4. Cholesterol
      const chol = +document.getElementById('cholesterol').value;
      if (chol >= 200) score++;

      // 5. Blood sugar
      const glucose = +document.getElementById('glucose').value;
      if (glucose >= 126) score++;

      // 6. Diabetes
      const diab = document.getElementById('diabetes').value === 'yes';
      if (diab) score++;

      // 7. Heart disease
      const hd = document.getElementById('heartDisease').value === 'yes';
      if (hd) score++;

      // 8. Atrial fibrillation
      if (document.getElementById('afib').checked) score++;

      // 9. LVH
      if (document.getElementById('lvh').checked) score++;

      // 10. Smoking
      const smoke = document.getElementById('smoke').value === 'yes';
      if (smoke) score++;

      // 11. Alcohol
      const alc = +document.getElementById('alcohol').value;
      if (alc > 14) score++; // WHO: 주당 14잔 초과는 고위험

      // 12. Physical activity
      const act = document.getElementById('activity').value;
      if (act === '0' || act === '1-2') score++; // 1주 2회 이하 운동은 위험

      // 13. Diet (fruits & veg)
      const diet = document.getElementById('diet').value;
      if (diet === '0-1' || diet === '2-3') score++; // 하루 4회 미만은 위험

      // 14. Sleep
      const sleep = +document.getElementById('sleep').value;
      if (sleep < 6 || sleep > 9) score++; // 비정상적 수면

      // 15. Stress
      const stress = +document.getElementById('stress').value;
      if (stress >= 4) score++; // 높은 스트레스

      // 16. BMI
      const height = +document.getElementById('height').value / 100;
      const weight = +document.getElementById('weight').value;
      const bmi = weight / (height * height);
      if (bmi >= 25) score++;

      // Risk evaluation
      let riskMessage;
      if (score <= 3) {
        riskMessage = `LOW risk (Score: ${score}점)`;
      } else if (score <= 7) {
        riskMessage = `MODERATE risk (Score: ${score}점)`;
      } else {
        riskMessage = `HIGH risk (Score: ${score}점)`;
      }

      // 결과 저장 및 페이지 이동
      localStorage.setItem('strokeRisk', riskMessage);
      window.location.href = 'result.html';
    });
  }

  // result.html 처리
  const resultEl = document.getElementById('resultText');
  if (resultEl) {
    const msg = localStorage.getItem('strokeRisk') || 'No data found.';
    resultEl.textContent = msg;
  }
})();
