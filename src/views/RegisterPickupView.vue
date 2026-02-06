<template>
  <div class="register-pickup-page py-8">
    <div class="container mx-auto px-4">
      <!-- Page Header -->
      <div class="page-header-form text-center mb-8">
        <h1 class="page-title-form text-4xl md:text-5xl font-black text-purple-600 mb-3">
          Kleidung abholen lassen
        </h1>
        <p class="page-subtitle-form text-lg text-gray-700">
          Wir holen Ihre Kleiderspende kostenlos bei Ihnen zu Hause ab
        </p>
      </div>

      <!-- Form Container -->
      <div class="form-container bg-white rounded-2xl shadow-2xl p-6 md:p-10 max-w-4xl mx-auto border border-purple-100">
        <div class="form-header text-center mb-8">
          <h2 class="form-title text-2xl font-bold text-gray-900 mb-2">🚚 Abholung vereinbaren</h2>
          <p class="form-description text-gray-600">
            Vereinbaren Sie einen Termin für die kostenlose Abholung Ihrer Kleiderspende
          </p>
        </div>

        <form @submit.prevent="handleSubmit" class="register-form" novalidate>
          <!-- Step 1: Personal Information -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Ihre Kontaktdaten</h3>
                <p class="step-description text-gray-600">Damit wir Sie für die Abholung erreichen können</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <BaseInput
                v-model="formData.firstName"
                label="Vorname"
                required
                placeholder="Max"
                autocomplete="given-name"
                :error="errors.firstName"
                @blur="validateField('firstName')"
              />
              <BaseInput
                v-model="formData.lastName"
                label="Nachname"
                required
                placeholder="Mustermann"
                autocomplete="family-name"
                :error="errors.lastName"
                @blur="validateField('lastName')"
              />
              <BaseInput
                v-model="formData.phone"
                label="Telefonnummer"
                type="tel"
                required
                placeholder="0621 123456789"
                autocomplete="tel"
                :error="errors.phone"
                @blur="validateField('phone')"
              />
              <BaseInput
                v-model="formData.email"
                label="E-Mail"
                type="email"
                placeholder="ihre.email@beispiel.de"
                autocomplete="email"
                :error="errors.email"
                helper-text="(optional)"
                @blur="validateField('email')"
              />
            </div>
          </div>

          <!-- Step 2: Address Information -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Ihre Adresse</h3>
                <p class="step-description text-gray-600">Wo sollen wir die Kleidung abholen?</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div class="md:col-span-2">
                <BaseInput
                  v-model="formData.street"
                  label="Straße und Hausnummer"
                  required
                  placeholder="Hauptstraße 123"
                  autocomplete="street-address"
                  :error="errors.street"
                  @blur="validateField('street')"
                />
              </div>
              <BaseInput
                v-model="formData.plz"
                label="Postleitzahl"
                required
                placeholder="69488"
                maxlength="5"
                pattern="[0-9]{5}"
                inputmode="numeric"
                autocomplete="postal-code"
                :error="errors.plz"
                @blur="validateField('plz')"
              />
              <BaseInput
                v-model="formData.city"
                label="Ort"
                required
                placeholder="Birkenau"
                autocomplete="address-level2"
                :error="errors.city"
                @blur="validateField('city')"
              />
            </div>

            <BaseInput
              v-model="formData.addressNotes"
              label="Zusätzliche Adressinformationen"
              placeholder="z.B. 2. Stock, Hinterhaus, Klingel rechts"
              helper-text="(optional)"
            />
          </div>

          <!-- Step 3: Donation Details -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Details Ihrer Spende</h3>
                <p class="step-description text-gray-600">Was möchten Sie spenden?</p>
              </div>
            </div>

            <!-- Clothing Type Selection -->
            <div class="form-group mb-6">
              <label class="form-label block text-sm font-semibold text-gray-700 mb-3">
                Art der Kleidung <span class="text-red-500">*</span>
              </label>
              <div class="grid md:grid-cols-2 gap-3">
                <button
                  v-for="item in clothingTypes"
                  :key="item.value"
                  type="button"
                  @click="toggleClothingType(item.value)"
                  :class="[
                    'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                    formData.clothing.includes(item.value)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <span class="text-3xl mr-3">{{ item.icon }}</span>
                  <span class="font-medium">{{ item.label }}</span>
                  <span v-if="formData.clothing.includes(item.value)" class="float-right text-purple-600">✔️</span>
                </button>
              </div>
              <div v-if="errors.clothing" class="text-red-500 text-sm mt-2">{{ errors.clothing }}</div>
            </div>

            <!-- Quantity Selection -->
            <div class="form-group">
              <label class="form-label block text-sm font-semibold text-gray-700 mb-3">
                Geschätzte Menge <span class="text-red-500">*</span>
              </label>
              <div class="grid md:grid-cols-3 gap-3">
                <button
                  v-for="item in quantityOptions"
                  :key="item.value"
                  type="button"
                  @click="formData.quantity = item.value; validateField('quantity')"
                  :class="[
                    'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                    formData.quantity === item.value
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  ]"
                >
                  <div class="text-2xl mb-2">{{ item.icon }}</div>
                  <div class="font-medium mb-1">{{ item.label }}</div>
                  <div class="text-xs text-gray-500">{{ item.desc }}</div>
                  <span v-if="formData.quantity === item.value" class="absolute top-3 right-3 text-purple-600">✔️</span>
                </button>
              </div>
              <div v-if="errors.quantity" class="text-red-500 text-sm mt-2">{{ errors.quantity }}</div>
            </div>
          </div>

          <!-- Step 4: Crisis Area -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Zielgebiet wählen</h3>
                <p class="step-description text-gray-600">Welchem Krisengebiet soll Ihre Spende helfen?</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-3">
              <button
                v-for="country in countries"
                :key="country.value"
                type="button"
                @click="formData.crisisArea = country.value; validateField('crisisArea')"
                :class="[
                  'selection-item text-left p-4 rounded-lg border-2 transition-all duration-200',
                  formData.crisisArea === country.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                ]"
              >
                <span class="text-3xl mr-3">{{ country.flag }}</span>
                <span class="font-medium">{{ country.label }}</span>
                <span v-if="formData.crisisArea === country.value" class="float-right text-purple-600">✔️</span>
              </button>
            </div>
            <div v-if="errors.crisisArea" class="text-red-500 text-sm mt-2">{{ errors.crisisArea }}</div>
          </div>

          <!-- Step 5: Pickup Date -->
          <div class="form-step mb-10">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                5
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Abholtermin</h3>
                <p class="step-description text-gray-600">Wann sollen wir die Kleidung abholen?</p>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <BaseInput
                v-model="formData.pickupDate"
                label="Wunschtermin"
                type="date"
                required
                :error="errors.pickupDate"
                @blur="validateField('pickupDate')"
              />
              <div class="form-group">
                <label class="form-label block text-sm font-semibold text-gray-700 mb-2">
                  Bevorzugte Uhrzeit
                </label>
                <select
                  v-model="formData.pickupTime"
                  class="form-select w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="morning">Vormittags (8-12 Uhr)</option>
                  <option value="afternoon">Nachmittags (12-16 Uhr)</option>
                  <option value="evening">Spätnachmittags (16-18 Uhr)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 6: Additional Info -->
          <div class="form-step mb-8">
            <div class="step-header flex items-start mb-6">
              <div class="step-number bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4 flex-shrink-0">
                6
              </div>
              <div class="step-info">
                <h3 class="step-title text-xl font-bold text-gray-900 mb-1">Zusätzliche Hinweise</h3>
                <p class="step-description text-gray-600">Haben Sie Anmerkungen oder Fragen?</p>
              </div>
            </div>

            <textarea
              v-model="formData.comments"
              placeholder="Haben Sie zusätzliche Anmerkungen zu Ihrer Spende oder Fragen an uns?"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="4"
            ></textarea>

            <!-- Terms Checkbox -->
            <div class="mt-6">
              <label class="flex items-start cursor-pointer">
                <input
                  v-model="formData.terms"
                  type="checkbox"
                  class="mt-1 mr-3 w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <span class="text-sm text-gray-700">
                  Ich akzeptiere die 
                  <router-link to="/datenschutz" class="text-purple-600 hover:underline">Datenschutzbestimmungen</router-link>
                  und erkläre mich mit der Verarbeitung meiner Daten einverstanden. <span class="text-red-500">*</span>
                </span>
              </label>
              <div v-if="errors.terms" class="text-red-500 text-sm mt-2">{{ errors.terms }}</div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <BaseButton
              native-type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
              class="w-full md:w-auto px-12"
            >
              Abholung verbindlich vereinbaren
            </BaseButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useDonationStore } from '@/stores/donationStore'

const router = useRouter()
const donationStore = useDonationStore()
const isSubmitting = ref(false)

const formData = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  street: '',
  plz: '',
  city: '',
  addressNotes: '',
  clothing: [],
  quantity: '',
  crisisArea: '',
  pickupDate: '',
  pickupTime: 'morning',
  comments: '',
  terms: false
})

const errors = reactive({})

const clothingTypes = [
  { value: 'shirts', icon: '👔', label: 'Hemden & T-Shirts' },
  { value: 'pants', icon: '👖', label: 'Hosen & Jeans' },
  { value: 'dresses', icon: '👗', label: 'Kleider & Röcke' },
  { value: 'jackets', icon: '🧥', label: 'Jacken & Mäntel' },
  { value: 'sweaters', icon: '🧶', label: 'Pullover' },
  { value: 'children', icon: '🍼', label: 'Kinderkleidung' },
  { value: 'shoes', icon: '👟', label: 'Schuhe' },
  { value: 'accessories', icon: '🧣', label: 'Accessoires' }
]

const quantityOptions = [
  { value: 'small', icon: '📦', label: 'Klein (1-2 Taschen/Kartons)', desc: 'bis 20kg' },
  { value: 'medium', icon: '📦📦', label: 'Mittel (3-5 Taschen/Kartons)', desc: '20-50kg' },
  { value: 'large', icon: '📦📦📦', label: 'Groß (6+ Taschen/Kartons)', desc: 'über 50kg' }
]

const countries = [
  { value: 'ukraine', flag: '🇺🇦', label: 'Ukraine' },
  { value: 'syria', flag: '🇸🇾', label: 'Syrien' },
  { value: 'afghanistan', flag: '🇦🇫', label: 'Afghanistan' },
  { value: 'yemen', flag: '🇾🇪', label: 'Jemen' },
  { value: 'somalia', flag: '🇸🇴', label: 'Somalia' },
  { value: 'haiti', flag: '🇭🇹', label: 'Haiti' }
]

const toggleClothingType = (value) => {
  const index = formData.clothing.indexOf(value)
  if (index > -1) {
    formData.clothing.splice(index, 1)
  } else {
    formData.clothing.push(value)
  }
  // Validate clothing selection on change
  validateField('clothing')
}

const validateField = (fieldName) => {
  // Clear existing error for this field
  delete errors[fieldName]

  switch(fieldName) {
    case 'firstName':
      if (!formData.firstName) {
        errors.firstName = 'Vorname ist erforderlich'
      } else if (formData.firstName.length < 2) {
        errors.firstName = 'Bitte geben Sie Ihren Vornamen ein (mind. 2 Zeichen)'
      } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.firstName)) {
        errors.firstName = 'Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
      }
      break

    case 'lastName':
      if (!formData.lastName) {
        errors.lastName = 'Nachname ist erforderlich'
      } else if (formData.lastName.length < 2) {
        errors.lastName = 'Bitte geben Sie Ihren Nachnamen ein (mind. 2 Zeichen)'
      } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.lastName)) {
        errors.lastName = 'Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
      }
      break

    case 'phone':
      if (!formData.phone) {
        errors.phone = 'Telefonnummer ist erforderlich'
      } else {
        const digits = formData.phone.replace(/\D/g, '')
        if (digits.length < 8) {
          errors.phone = 'Telefonnummer muss mindestens 8 Ziffern haben'
        } else if (digits.length > 15) {
          errors.phone = 'Telefonnummer zu lang (max. 15 Ziffern)'
        }
      }
      break

    case 'email':
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      }
      break

    case 'street':
      if (!formData.street) {
        errors.street = 'Straße und Hausnummer sind erforderlich'
      } else if (formData.street.length < 5) {
        errors.street = 'Mindestens 5 Zeichen erforderlich'
      } else if (!/^.+\s+\d+.*$/.test(formData.street)) {
        errors.street = 'Bitte Straße und Hausnummer angeben (z.B. Hauptstraße 123)'
      }
      break

    case 'plz':
      if (!formData.plz) {
        errors.plz = 'Postleitzahl ist erforderlich'
      } else if (!/^\d{5}$/.test(formData.plz)) {
        errors.plz = 'Postleitzahl muss genau 5 Ziffern haben'
      } else if (!formData.plz.startsWith('69')) {
        errors.plz = 'Abholung nur im Gebiet 69xxx möglich'
      }
      break

    case 'city':
      if (!formData.city) {
        errors.city = 'Ortsname ist erforderlich'
      } else if (formData.city.length < 2) {
        errors.city = 'Ortsname zu kurz'
      } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.city)) {
        errors.city = 'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt'
      }
      break

    case 'clothing':
      if (formData.clothing.length === 0) {
        errors.clothing = 'Bitte wählen Sie mindestens eine Kleidungsart aus'
      }
      break

    case 'quantity':
      if (!formData.quantity) {
        errors.quantity = 'Bitte wählen Sie eine Mengenangabe aus'
      }
      break

    case 'crisisArea':
      if (!formData.crisisArea) {
        errors.crisisArea = 'Bitte wählen Sie ein Zielgebiet aus'
      }
      break

    case 'pickupDate':
      if (!formData.pickupDate) {
        errors.pickupDate = 'Bitte wählen Sie ein Datum aus'
      } else {
        const selectedDate = new Date(formData.pickupDate)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(0, 0, 0, 0)
        if (selectedDate < tomorrow) {
          errors.pickupDate = 'Abholtermin muss mindestens morgen sein'
        }
      }
      break
  }
}

const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  // Vorname validieren
  if (!formData.firstName) {
    errors.firstName = 'Vorname ist erforderlich'
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'Bitte geben Sie Ihren Vornamen ein (mind. 2 Zeichen)'
  } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.firstName)) {
    errors.firstName = 'Vorname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
  }

  // Nachname validieren
  if (!formData.lastName) {
    errors.lastName = 'Nachname ist erforderlich'
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Bitte geben Sie Ihren Nachnamen ein (mind. 2 Zeichen)'
  } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.lastName)) {
    errors.lastName = 'Nachname darf nur Buchstaben, Leerzeichen und Bindestriche enthalten'
  }

  // Telefon validieren
  if (!formData.phone) {
    errors.phone = 'Telefonnummer ist erforderlich'
  } else {
    const digits = formData.phone.replace(/\D/g, '')
    if (digits.length < 8) {
      errors.phone = 'Telefonnummer muss mindestens 8 Ziffern haben'
    } else if (digits.length > 15) {
      errors.phone = 'Telefonnummer zu lang (max. 15 Ziffern)'
    }
  }

  // E-Mail validieren (optional)
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
  }

  // Straße validieren
  if (!formData.street) {
    errors.street = 'Straße und Hausnummer sind erforderlich'
  } else if (formData.street.length < 5) {
    errors.street = 'Mindestens 5 Zeichen erforderlich'
  } else if (!/^.+\s+\d+.*$/.test(formData.street)) {
    errors.street = 'Bitte Straße und Hausnummer angeben (z.B. Hauptstraße 123)'
  }

  // PLZ validieren - nur 69xxx für Abholung!
  if (!formData.plz) {
    errors.plz = 'Postleitzahl ist erforderlich'
  } else if (!/^\d{5}$/.test(formData.plz)) {
    errors.plz = 'Postleitzahl muss genau 5 Ziffern haben'
  } else if (!formData.plz.startsWith('69')) {
    errors.plz = 'Abholung nur im Gebiet 69xxx möglich'
  }

  // Ort validieren
  if (!formData.city) {
    errors.city = 'Ortsname ist erforderlich'
  } else if (formData.city.length < 2) {
    errors.city = 'Ortsname zu kurz'
  } else if (!/^[a-zA-ZäöüÄÖÜß\s\-]+$/.test(formData.city)) {
    errors.city = 'Nur Buchstaben, Leerzeichen und Bindestriche erlaubt'
  }

  // Kleidungsauswahl
  if (formData.clothing.length === 0) {
    errors.clothing = 'Bitte wählen Sie mindestens eine Kleidungsart aus'
  }

  // Mengenauswahl
  if (!formData.quantity) {
    errors.quantity = 'Bitte wählen Sie eine Mengenangabe aus'
  }

  // Zielgebiet
  if (!formData.crisisArea) {
    errors.crisisArea = 'Bitte wählen Sie ein Zielgebiet aus'
  }

  // Datum validieren - nicht in der Vergangenheit!
  if (!formData.pickupDate) {
    errors.pickupDate = 'Bitte wählen Sie ein Datum aus'
  } else {
    const selectedDate = new Date(formData.pickupDate)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    if (selectedDate < tomorrow) {
      errors.pickupDate = 'Abholtermin muss mindestens morgen sein'
    }
  }

  // Datenschutz
  if (!formData.terms) {
    errors.terms = 'Sie müssen den Datenschutzbestimmungen zustimmen'
  }

  return Object.keys(errors).length === 0
}

const scrollToFirstError = () => {
  const firstErrorKey = Object.keys(errors).find(key => errors[key])
  if (firstErrorKey) {
    // Find the input element by matching label or name attribute
    const errorElement = document.querySelector(`[name="${firstErrorKey}"], #${firstErrorKey}, [data-error="${firstErrorKey}"]`)
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      // Try to focus the element after scrolling
      setTimeout(() => {
        if (errorElement.focus) {
          errorElement.focus()
        } else {
          // If it's not focusable, try to find an input inside
          const input = errorElement.querySelector('input, select, textarea')
          if (input) input.focus()
        }
      }, 300)
    }
  }
}

const handleSubmit = async () => {
  console.log('Form submitted!', formData)
  
  if (!validate()) {
    console.log('Validation failed:', errors)
    scrollToFirstError()
    return
  }

  console.log('Validation passed!')
  isSubmitting.value = true

  try {
    const referenceNumber = `KSB-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000) + 1000}`
    
    await donationStore.saveDonation({
      ...formData,
      type: 'pickup',
      referenceNumber,
      submittedAt: new Date().toISOString()
    })

    console.log('Navigating to confirmation with ref:', referenceNumber)
    router.push(`/confirmation?ref=${referenceNumber}`)
  } catch (error) {
    console.error('Submission error:', error)
    alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.selection-item {
  position: relative;
  cursor: pointer;
}

.selection-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
