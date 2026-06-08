import emailjs from '@emailjs/browser';

// Replace these with your EmailJS credentials
const EMAILJS_PUBLIC_KEY = 'mHYQOzpSwHMhQz_HI';
const EMAILJS_SERVICE_ID = 'service_tleygd9';
const EMAILJS_TEMPLATE_ID = 'template_ye3sl3s';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendVoteNotification = async (event, participant, totalVotes) => {
  const templateParams = {
    event_name: event.name,
    participant_name: participant.name,
    participant_phone: participant.phone,
    selected_date: participant.selectedDate,
    selected_location: participant.selectedLocation,
    total_votes: totalVotes.toString(),
    dashboard_link: `${window.location.origin}/admin`
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
    console.log('Email sent successfully!', response.status);
    return true;
  } catch (error) {
    console.error('Email failed to send:', error);
    return false;
  }
};