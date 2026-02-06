<template>
  <div class="confirmation-page">
    <div class="container mx-auto px-4 py-8">
      <!-- Success Hero -->
      <section class="success-hero text-center mb-12">
        <div class="success-animation mb-6">
          <div class="success-icon text-6xl">✅</div>
        </div>
        <h1 class="success-title text-3xl font-bold text-gray-900 mb-4">
          {{ confirmationTitle }}
        </h1>
        <p class="success-subtitle text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Vielen Dank für Ihre Unterstützung! Ihre Hilfe macht einen Unterschied.
        </p>
        <div class="reference-number inline-flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-lg px-6 py-4 shadow-md">
          <span class="reference-label text-sm text-gray-600 font-medium">Referenznummer:</span>
          <span class="reference-value font-mono text-lg font-bold text-purple-600">
            {{ referenceNumber }}
          </span>
          <button
            @click="copyReference"
            class="copy-btn bg-white border border-purple-200 rounded px-3 py-1 hover:bg-purple-50 transition-colors"
            :title="copied ? 'Kopiert!' : 'Referenznummer kopieren'"
          >
            {{ copied ? '✓' : '📋' }}
          </button>
        </div>
      </section>

      <!-- Confirmation Details -->
      <section class="confirmation-details mb-12">
        <div class="details-grid grid md:grid-cols-2 gap-6">
          
          <!-- Donation Details Card - MOVED TO TOP -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                👕
              </div>
              <h3 class="card-title text-lg font-bold text-gray-900">Spendendetails</h3>
            </div>
            <div class="card-content space-y-3">
              <div class="detail-row">
                <span class="detail-label text-gray-600 font-medium block mb-1">Kleidungsarten:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ clothingTypesText }}</span>
              </div>
              <div class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Menge:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ quantityText }}</span>
              </div>
              <div class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Zielgebiet:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ crisisAreaText }}</span>
              </div>
            </div>
          </div>

          <!-- Schedule / Drop-off Information Card -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                📅
              </div>
              <h3 class="card-title text-lg font-bold text-gray-900">Spendenabgabe</h3>
            </div>
            <div class="card-content space-y-3">
              <div class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Registriert am:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ submittedDateTime }}</span>
              </div>
              <div v-if="donationData.type === 'pickup' && donationData.pickupDate" class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Abholtermin:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ formatDate(donationData.pickupDate) }}</span>
              </div>
              <div v-if="donationData.type === 'pickup' && donationData.pickupTime" class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Uhrzeit:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ formatTime(donationData.pickupTime) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label text-gray-600 font-medium block mb-1">Ort:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ locationText }}</span>
              </div>
            </div>
          </div>

          <!-- Personal Information Card -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                👤
              </div>
              <h3 class="card-title text-lg font-bold text-gray-900">Kontaktdaten</h3>
            </div>
            <div class="card-content space-y-3">
              <div class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Name:</span>
                <span class="detail-value text-gray-900 font-semibold">
                  {{ donationData.firstName }} {{ donationData.lastName }}
                </span>
              </div>
              <div class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">Telefon:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ donationData.phone }}</span>
              </div>
              <div v-if="donationData.email" class="detail-row flex justify-between">
                <span class="detail-label text-gray-600 font-medium">E-Mail:</span>
                <span class="detail-value text-gray-900 font-semibold">{{ donationData.email }}</span>
              </div>
            </div>
          </div>

          <!-- Next Steps Card - COMPACT VERSION IN GRID -->
          <div class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                ✓
              </div>
              <h3 class="card-title text-lg font-bold text-gray-900">Wie geht es weiter?</h3>
            </div>
            <div class="card-content space-y-4">
              <div class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  1
                </div>
                <div class="step-text">
                  <h4 class="font-semibold text-gray-900 text-sm mb-0.5">{{ step1Title }}</h4>
                  <p class="text-gray-600 text-xs">{{ step1Text }}</p>
                </div>
              </div>
              <div class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  2
                </div>
                <div class="step-text">
                  <h4 class="font-semibold text-gray-900 text-sm mb-0.5">Vorbereitung</h4>
                  <p class="text-gray-600 text-xs">Bereiten Sie Ihre Kleiderspende gut verpackt vor.</p>
                </div>
              </div>
              <div class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  3
                </div>
                <div class="step-text">
                  <h4 class="font-semibold text-gray-900 text-sm mb-0.5">{{ step3Title }}</h4>
                  <p class="text-gray-600 text-xs">{{ step3Text }}</p>
                </div>
              </div>
              <div class="step-item flex gap-3">
                <div class="step-number w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  4
                </div>
                <div class="step-text">
                  <h4 class="font-semibold text-gray-900 text-sm mb-0.5">Tracking</h4>
                  <p class="text-gray-600 text-xs">Verfolgen Sie Ihre Spende mit der Referenznummer.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Notes Card -->
          <div v-if="donationData.comments" class="detail-card bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-all md:col-span-2">
            <div class="card-header flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
              <div class="card-icon w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-xl">
                📝
              </div>
              <h3 class="card-title text-lg font-bold text-gray-900">Zusätzliche Hinweise</h3>
            </div>
            <div class="card-content">
              <div class="detail-row">
                <span class="detail-value text-gray-900">{{ donationData.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Actions -->
      <section class="confirmation-actions">
        <div class="actions-grid grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <BaseButton
            variant="primary"
            size="lg"
            full-width
            @click="printConfirmation"
          >
            <span class="btn-icon text-xl mr-2">🖨️</span>
            <span class="btn-text">PDF drucken</span>
          </BaseButton>
          <BaseButton
            variant="secondary"
            size="lg"
            full-width
            @click="router.push('/tracking')"
          >
            <span class="btn-icon text-xl mr-2">📍</span>
            <span class="btn-text">Spende verfolgen</span>
          </BaseButton>
          <BaseButton
            variant="secondary"
            size="lg"
            full-width
            @click="router.push('/')"
          >
            <span class="btn-icon text-xl mr-2">🏠</span>
            <span class="btn-text">Zur Startseite</span>
          </BaseButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useDonationStore } from '@/stores/donationStore'

const router = useRouter()
const route = useRoute()
const donationStore = useDonationStore()
const copied = ref(false)

const referenceNumber = computed(() => route.query.ref || 'N/A')
const donationData = computed(() => donationStore.lastDonation || {})

const confirmationTitle = computed(() => {
  return donationData.value.type === 'pickup' 
    ? 'Ihre Abholung wurde erfolgreich registriert'
    : 'Ihre Spende wurde erfolgreich registriert'
})

const locationText = computed(() => {
  if (donationData.value.type === 'pickup') {
    return `${donationData.value.street}, ${donationData.value.plz} ${donationData.value.city}`
  }
  return 'Hauptstraße 45, 69488 Birkenau'
})

const clothingTypesText = computed(() => {
  const types = {
    'shirts': 'Hemden & T-Shirts',
    'pants': 'Hosen & Jeans',
    'dresses': 'Kleider & Röcke',
    'jackets': 'Jacken & Mäntel',
    'sweaters': 'Pullover',
    'children': 'Kinderkleidung',
    'shoes': 'Schuhe',
    'accessories': 'Accessoires'
  }
  return donationData.value.clothing?.map(c => types[c] || c).join(', ') || 'Nicht angegeben'
})

const quantityText = computed(() => {
  const quantities = {
    'small': 'Klein (1-2 Taschen/Kartons)',
    'medium': 'Mittel (3-5 Taschen/Kartons)',
    'large': 'Groß (6+ Taschen/Kartons)'
  }
  return quantities[donationData.value.quantity] || 'Nicht angegeben'
})

const crisisAreaText = computed(() => {
  const areas = {
    'ukraine': '🇺🇦 Ukraine',
    'syria': '🇸🇾 Syrien',
    'afghanistan': '🇦🇫 Afghanistan',
    'yemen': '🇾🇪 Jemen',
    'somalia': '🇸🇴 Somalia',
    'haiti': '🇭🇹 Haiti'
  }
  return areas[donationData.value.crisisArea] || 'Nicht angegeben'
})

const submittedDateTime = computed(() => {
  if (!donationData.value.submittedAt) return 'Gerade eben'
  const date = new Date(donationData.value.submittedAt)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }) + ' um ' + date.toLocaleTimeString('de-DE', { 
    hour: '2-digit', 
    minute: '2-digit' 
  }) + ' Uhr'
})

const step1Title = computed(() => {
  return donationData.value.type === 'pickup' ? 'Bestätigung erhalten' : 'Registrierung abgeschlossen'
})

const step1Text = computed(() => {
  return donationData.value.email 
    ? 'Sie haben eine E-Mail-Bestätigung mit allen Details erhalten.'
    : 'Ihre Registrierung wurde erfolgreich gespeichert.'
})

const step3Title = computed(() => {
  return donationData.value.type === 'pickup' ? 'Abholung' : 'Abgabe'
})

const step3Text = computed(() => {
  return donationData.value.type === 'pickup'
    ? 'Unser Team wird Sie am vereinbarten Termin kontaktieren.'
    : 'Bringen Sie Ihre Spende zu unseren Öffnungszeiten vorbei.'
})

const formatDate = (dateStr) => {
  if (!dateStr) return 'Nicht angegeben'
  const date = new Date(dateStr)
  return date.toLocaleDateString('de-DE', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

const formatTime = (timeStr) => {
  const times = {
    'morning': 'Vormittags (8-12 Uhr)',
    'afternoon': 'Nachmittags (12-16 Uhr)',
    'evening': 'Spätnachmittags (16-18 Uhr)'
  }
  return times[timeStr] || timeStr
}

const copyReference = async () => {
  try {
    await navigator.clipboard.writeText(referenceNumber.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const printConfirmation = () => {
  window.print()
}

onMounted(() => {
  if (!route.query.ref) {
    router.push('/')
  }
})
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  padding: 2rem 0;
}

/* Animations */
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.8s ease-out;
  filter: drop-shadow(0 4px 12px rgba(34, 197, 94, 0.3));
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out 0.2s both;
}

.animate-fade-in-up-delay {
  animation: fade-in-up 0.6s ease-out 0.4s both;
}

.animate-fade-in-up-delay-2 {
  animation: fade-in-up 0.6s ease-out 0.6s both;
}

/* Print styles */
@media print {
  .confirmation-actions {
    display: none;
  }
  
  .copy-btn {
    display: none;
  }
  
  .detail-card {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
