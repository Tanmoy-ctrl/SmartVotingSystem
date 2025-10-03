document.addEventListener('DOMContentLoaded', function () {
  // Existing Ping & Init handlers ...

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('name').value.trim(),
        aadhaar: document.getElementById('aadhaar').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
      };

      // client-side Aadhaar check
      if (!/^[0-9]{12}$/.test(data.aadhaar)) {
        document.getElementById('regResult').innerHTML =
          '<div class="alert alert-danger">Invalid Aadhaar number</div>';
        return;
      }
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (res.ok) {
          document.getElementById('regResult').innerHTML =
            <div class="alert alert-success">${result.message}</div>;
          registerForm.reset();
        } else {
          document.getElementById('regResult').innerHTML =
            <div class="alert alert-danger">${result.message}</div>;
        }
      } catch (err) {
        document.getElementById('regResult').innerHTML =
          <div class="alert alert-danger">Error: ${err.message}</div>;
      }
    });
  }
});
