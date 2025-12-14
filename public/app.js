let supabase;

async function initializeSupabase() {
  try {
    const SUPABASE_URL = 'https://lnvevruftnmfmaswszvv.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_JnadYW9Wqs441mZjNLaJSA_9XKgUnQx';
    
    const { createClient } = window.supabase;
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    await verifyEmail();
  } catch (err) {
    console.error('Error:', err);
    showError('Error al inicializar: ' + err.message);
  }
}

async function verifyEmail() {
  try {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('access_token');
    const type = url.searchParams.get('type');
    const email = url.searchParams.get('email');
    
    console.log('Token:', token);
    console.log('Type:', type);
    console.log('Email:', email);
    
    if (!token || !email) {
      showError('Token o email inválido en el enlace');
      return;
    }
    
    // Verify the email with Supabase
    const { data, error } = await supabase.auth.verifyOtp({
      type: type || 'signup',
      token: token,
      email: email
    });
    
    if (error) {
      console.error('Verification error:', error);
      showError('Error al verificar: ' + error.message);
      return;
    }
    
    console.log('Email verified successfully:', data);
    showSuccess();
    
  } catch (err) {
    console.error('Exception:', err);
    showError('Error: ' + err.message);
  }
}

function showError(message) {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('successState').style.display = 'none';
  const errorDiv = document.getElementById('errorState');
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function showSuccess() {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('successState').style.display = 'block';
  
  let seconds = 5;
  const countdownEl = document.getElementById('countdown');
  const interval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(interval);
      // Redirect to app
      window.location.href = 'https://login-dart-ni6l-o270yeldj-lyxuzs-projects.vercel.app/';
    }
  }, 1000);
}

window.addEventListener('load', initializeSupabase);
