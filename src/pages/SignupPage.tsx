import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AuthLayout } from "../components/AuthLayout";
import { TablixLogo } from "../components/TablixLogo";
import { Button } from "../components/ds";
import { authAPI } from "../services/api";

// Nigeria states and cities
const NIGERIA_STATES: Record<string, string[]> = {
  "Abia": ["Aba North", "Aba South", "Arochukwu", "Bende", "Ikwuano", "Isiala Ngwa North", "Isiala Ngwa South", "Isuikwuato", "Obi Ngwa", "Ohafia", "Osisioma", "Ugwunagbo", "Ukwa East", "Ukwa West", "Umuahia North", "Umuahia South", "Umu Nneochi"],
  "Adamawa": ["Demsa", "Fufure", "Ganye", "Gayuk", "Gombi", "Grie", "Hong", "Jada", "Lamurde", "Madagali", "Maiha", "Mayo Belwa", "Michika", "Mubi North", "Mubi South", "Numan", "Shelleng", "Song", "Toungo", "Yola North", "Yola South"],
  "Akwa Ibom": ["Abak", "Eastern Obolo", "Eket", "Esit Eket", "Essien Udim", "Etim Ekpo", "Etinan", "Ibeno", "Ibesikpo Asutan", "Ibiono-Ibom", "Ika", "Ikono", "Ikot Abasi", "Ikot Ekpene", "Ini", "Itu", "Mbo", "Mkpat-Enin", "Nsit-Atai", "Nsit-Ibom", "Nsit-Ubium", "Obot Akara", "Okobo", "Onna", "Oron", "Oruk Anam", "Udung-Uko", "Ukanafun", "Uruan", "Urue-Offong/Oruko", "Uyo"],
  "Anambra": ["Aguata", "Anambra East", "Anambra West", "Anaocha", "Awka North", "Awka South", "Ayamelum", "Dunukofia", "Ekwusigo", "Idemili North", "Idemili South", "Ihiala", "Njikoka", "Nnewi North", "Nnewi South", "Ogbaru", "Onitsha North", "Onitsha South", "Orumba North", "Orumba South", "Oyi"],
  "Bauchi": ["Alkaleri", "Bauchi", "Bogoro", "Damban", "Darazo", "Dass", "Gamawa", "Ganjuwa", "Giade", "Itas/Gadau", "Jama'are", "Katagum", "Kirfi", "Misau", "Ningi", "Shira", "Tafawa Balewa", "Toro", "Warji", "Zaki"],
  "Bayelsa": ["Brass", "Ekeremor", "Kolokuma/Opokuma", "Nembe", "Ogbia", "Sagbama", "Southern Ijaw", "Yenagoa"],
  "Benue": ["Ado", "Agatu", "Apa", "Buruku", "Gboko", "Guma", "Gwer East", "Gwer West", "Katsina-Ala", "Konshisha", "Kwande", "Logo", "Makurdi", "Obi", "Ogbadibo", "Ohimini", "Oju", "Okpokwu", "Otukpo", "Tarka", "Ukum", "Ushongo", "Vandeikya"],
  "Borno": ["Abadam", "Askira/Uba", "Bama", "Bayo", "Biu", "Chibok", "Damboa", "Dikwa", "Gubio", "Guzamala", "Gwoza", "Hawul", "Jere", "Kaga", "Kala/Balge", "Konduga", "Kukawa", "Kwaya Kusar", "Mafa", "Magumeri", "Maiduguri", "Marte", "Mobbar", "Monguno", "Ngala", "Nganzai", "Shani"],
  "Cross River": ["Abi", "Akamkpa", "Akpabuyo", "Bakassi", "Bekwarra", "Biase", "Boki", "Calabar Municipal", "Calabar South", "Etung", "Ikom", "Obanliku", "Obubra", "Obudu", "Odukpani", "Ogoja", "Yakuur", "Yala"],
  "Delta": ["Aniocha North", "Aniocha South", "Bomadi", "Burutu", "Ethiope East", "Ethiope West", "Ika North East", "Ika South", "Isoko North", "Isoko South", "Ndokwa East", "Ndokwa West", "Okpe", "Oshimili North", "Oshimili South", "Patani", "Sapele", "Udu", "Ughelli North", "Ughelli South", "Ukwuani", "Uvwie", "Warri North", "Warri South", "Warri South West"],
  "Ebonyi": ["Abakaliki", "Afikpo North", "Afikpo South", "Ebonyi", "Ezza North", "Ezza South", "Ikwo", "Ishielu", "Ivo", "Izzi", "Ohaozara", "Ohaukwu", "Onicha"],
  "Edo": ["Akoko-Edo", "Egor", "Esan Central", "Esan North-East", "Esan South-East", "Esan West", "Etsako Central", "Etsako East", "Etsako West", "Igueben", "Ikpoba-Okha", "Orhionmwon", "Oredo", "Ovia North-East", "Ovia South-West", "Owan East", "Owan West", "Uhunmwonde"],
  "Ekiti": ["Ado Ekiti", "Efon", "Ekiti East", "Ekiti South-West", "Ekiti West", "Emure", "Gbonyin", "Ido/Osi", "Ijero", "Ikere", "Ikole", "Ilejemeje", "Irepodun/Ifelodun", "Ise/Orun", "Moba", "Oye"],
  "Enugu": ["Aninri", "Awgu", "Enugu East", "Enugu North", "Enugu South", "Ezeagu", "Igbo Etiti", "Igbo Eze North", "Igbo Eze South", "Isi Uzo", "Nkanu East", "Nkanu West", "Nsukka", "Oji River", "Udenu", "Udi", "Uzo Uwani"],
  "FCT": ["Abaji", "Abuja Municipal", "Bwari", "Gwagwalada", "Kuje", "Kwali"],
  "Gombe": ["Akko", "Balanga", "Billiri", "Dukku", "Funakaye", "Gombe", "Kaltungo", "Kwami", "Nafada", "Shongom", "Yamaltu/Deba"],
  "Imo": ["Aboh Mbaise", "Ahiazu Mbaise", "Ehime Mbano", "Ezinihitte", "Ideato North", "Ideato South", "Ihitte/Uboma", "Ikeduru", "Isiala Mbano", "Isu", "Mbaitoli", "Ngor Okpala", "Njaba", "Nkwerre", "Nwangele", "Obowo", "Oguta", "Ohaji/Egbema", "Okigwe", "Orlu", "Orsu", "Oru East", "Oru West", "Owerri Municipal", "Owerri North", "Owerri West", "Unuimo"],
  "Jigawa": ["Auyo", "Babura", "Biriniwa", "Birnin Kudu", "Buji", "Dutse", "Gagarawa", "Garki", "Gumel", "Guri", "Gwaram", "Gwiwa", "Hadejia", "Jahun", "Kafin Hausa", "Kaugama", "Kazaure", "Kiri Kasama", "Kiyawa", "Maigatari", "Malam Madori", "Miga", "Ringim", "Roni", "Sule Tankarkar", "Taura", "Yankwashi"],
  "Kaduna": ["Birnin Gwari", "Chikun", "Giwa", "Igabi", "Ikara", "Jaba", "Jema'a", "Kachia", "Kaduna North", "Kaduna South", "Kagarko", "Kajuru", "Kaura", "Kauru", "Kubau", "Kudan", "Lere", "Makarfi", "Sabon Gari", "Sanga", "Soba", "Zangon Kataf", "Zaria"],
  "Kano": ["Ajingi", "Albasu", "Bagwai", "Bebeji", "Bichi", "Bunkure", "Dala", "Dambatta", "Dawakin Kudu", "Dawakin Tofa", "Doguwa", "Fagge", "Gabasawa", "Garko", "Garun Mallam", "Gaya", "Gezawa", "Gwale", "Gwarzo", "Kabo", "Kano Municipal", "Karaye", "Kibiya", "Kiru", "Kumbotso", "Kunchi", "Kura", "Madobi", "Makoda", "Minjibir", "Nasarawa", "Rano", "Rimin Gado", "Rogo", "Shanono", "Sumaila", "Takai", "Tarauni", "Tofa", "Tsanyawa", "Tudun Wada", "Ungogo", "Warawa", "Wudil"],
  "Katsina": ["Bakori", "Batagarawa", "Batsari", "Baure", "Bindawa", "Charanchi", "Dan Musa", "Dandume", "Danja", "Daura", "Dutsi", "Dutsin Ma", "Faskari", "Funtua", "Ingawa", "Jibia", "Kafur", "Kaita", "Kankara", "Kankia", "Katsina", "Kurfi", "Kusada", "Mai'Adua", "Malumfashi", "Mani", "Mashi", "Matazu", "Musawa", "Rimi", "Sabuwa", "Safana", "Sandamu", "Zango"],
  "Kebbi": ["Aleiro", "Arewa Dandi", "Argungu", "Augie", "Bagudo", "Birnin Kebbi", "Bunza", "Dandi", "Fakai", "Gwandu", "Jega", "Kalgo", "Koko/Besse", "Maiyama", "Ngaski", "Sakaba", "Shanga", "Suru", "Wasagu/Danko", "Yauri", "Zuru"],
  "Kogi": ["Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela-Odolu", "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa-Muro", "Ofu", "Ogori/Magongo", "Okehi", "Okene", "Olamaboro", "Omala", "Yagba East", "Yagba West"],
  "Kwara": ["Asa", "Baruten", "Edu", "Ekiti", "Ifelodun", "Ilorin East", "Ilorin South", "Ilorin West", "Irepodun", "Isin", "Kaiama", "Moro", "Offa", "Oke Ero", "Oyun", "Pategi"],
  "Lagos": [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
    "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye",
    "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland",
    "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
  ],
  "Nasarawa": ["Akwanga", "Awe", "Doma", "Karu", "Keana", "Keffi", "Kokona", "Lafia", "Nasarawa", "Nasarawa Egon", "Obi", "Toto", "Wamba"],
  "Niger": ["Agaie", "Agwara", "Bida", "Borgu", "Bosso", "Chanchaga", "Edati", "Gbako", "Gurara", "Katcha", "Kontagora", "Lapai", "Lavun", "Magama", "Mariga", "Mashegu", "Mokwa", "Moya", "Paikoro", "Rafi", "Rijau", "Shiroro", "Suleja", "Tafa", "Wushishi"],
  "Ogun": ["Abeokuta North", "Abeokuta South", "Ado-Odo/Ota", "Egbado North", "Egbado South", "Ewekoro", "Ifo", "Ijebu East", "Ijebu North", "Ijebu North East", "Ijebu Ode", "Ikenne", "Imeko Afon", "Ipokia", "Obafemi Owode", "Odeda", "Odogbolu", "Ogun Waterside", "Remo North", "Shagamu"],
  "Ondo": ["Akoko North-East", "Akoko North-West", "Akoko South-East", "Akoko South-West", "Akure North", "Akure South", "Ese Odo", "Idanre", "Ifedore", "Ilaje", "Ile Oluji/Okeigbo", "Irele", "Odigbo", "Okitipupa", "Ondo East", "Ondo West", "Ose", "Owo"],
  "Osun": ["Aiyedaade", "Aiyedire", "Atakumosa East", "Atakumosa West", "Boluwaduro", "Boripe", "Ede North", "Ede South", "Egbedore", "Ejigbo", "Ife Central", "Ife East", "Ife North", "Ife South", "Ifedayo", "Ifelodun", "Ila", "Ilesa East", "Ilesa West", "Irepodun", "Irewole", "Isokan", "Iwo", "Obokun", "Odo Otin", "Ola Oluwa", "Olorunda", "Oriade", "Orolu", "Osogbo"],
  "Oyo": ["Afijio", "Akinyele", "Atiba", "Atisbo", "Egbeda", "Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Ibarapa Central", "Ibarapa East", "Ibarapa North", "Ido", "Irepo", "Iseyin", "Itesiwaju", "Iwajowa", "Kajola", "Lagelu", "Ogbomosho North", "Ogbomosho South", "Ogo Oluwa", "Olorunsogo", "Oluyole", "Ona Ara", "Orelope", "Ori Ire", "Oyo East", "Oyo West", "Saki East", "Saki West", "Surulere"],
  "Plateau": ["Barkin Ladi", "Bassa", "Bokkos", "Jos East", "Jos North", "Jos South", "Kanam", "Kanke", "Langtang North", "Langtang South", "Mangu", "Mikang", "Pankshin", "Qua'an Pan", "Riyom", "Shendam", "Wase"],
  "Rivers": ["Abua/Odual", "Ahoada East", "Ahoada West", "Akuku-Toru", "Andoni", "Asari-Toru", "Bonny", "Degema", "Eleme", "Emohua", "Etche", "Gokana", "Ikwerre", "Khana", "Obio/Akpor", "Ogba/Egbema/Ndoni", "Ogu/Bolo", "Okrika", "Omuma", "Opobo/Nkoro", "Oyigbo", "Port Harcourt", "Tai"],
  "Sokoto": ["Binji", "Bodinga", "Dange Shuni", "Gada", "Goronyo", "Gudu", "Gwadabawa", "Illela", "Isa", "Kebbe", "Kware", "Rabah", "Sabon Birni", "Shagari", "Silame", "Sokoto North", "Sokoto South", "Tambuwal", "Tangaza", "Tureta", "Wamako", "Wurno", "Yabo"],
  "Taraba": ["Ardo Kola", "Bali", "Donga", "Gashaka", "Gassol", "Ibi", "Jalingo", "Karim Lamido", "Kumi", "Lau", "Sardauna", "Takum", "Ussa", "Wukari", "Yorro", "Zing"],
  "Yobe": ["Bade", "Bursari", "Damaturu", "Fika", "Fune", "Geidam", "Gujba", "Gulani", "Jakusko", "Karasuwa", "Machina", "Nangere", "Nguru", "Potiskum", "Tarmuwa", "Yunusari", "Yusufari"],
  "Zamfara": ["Anka", "Bakura", "Birnin Magaji/Kiyaw", "Bukkuyum", "Bungudu", "Gummi", "Gusau", "Kaura Namoda", "Maradun", "Maru", "Shinkafi", "Talata Mafara", "Tsafe", "Zurmi"],
};

const STATE_LIST = Object.keys(NIGERIA_STATES).sort();

// Nigerian phone validation: 08x, 07x, 09x, 01x — 11 digits total
function formatNigerianPhone(digits: string): string {
  // Only keep digits
  const d = digits.replace(/\D/g, "");
  // Max 10 digits after the 0 prefix (11 total)
  return d.slice(0, 10);
}

function isValidNigerianPhone(local: string): boolean {
  // local is the 10-digit portion after the leading 0
  // Valid Nigerian prefixes after 0: 70, 80, 81, 90, 91, 10, 12 etc.
  const full = "0" + local;
  return /^0[7-9][0-1]\d{8}$/.test(full) || /^0[1][0-9]\d{7}$/.test(full);
}

import { motion, AnimatePresence } from "motion/react";
import imgFoodBg from "../../login-bg.png";

const INTER = "'Inter', sans-serif";

const BUSINESS_TYPES = [
  "Quick Service Restaurant",
  "Full Service Restaurant",
  "Cafe / Bakery",
  "Bar & Lounge",
  "Food Truck",
  "Catering",
  "Other"
];

// ── Mobile Layout ───────────────────────────────────────────────────────────
function MobileSignup({ onOpenModal }: { onOpenModal: (type: "privacy" | "terms") => void }) {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (raw: string) => {
    let cleaned = raw.replace(/\D/g, "");
    if (cleaned.startsWith("234")) cleaned = cleaned.slice(3);
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);
    const digits = formatNigerianPhone(cleaned);
    setForm((prev) => ({ ...prev, phone: digits }));

    if (digits.length > 0 && digits.length < 10) {
      setPhoneError("Enter a valid 11-digit Nigerian number");
    } else if (digits.length === 10 && !isValidNigerianPhone(digits)) {
      setPhoneError("Invalid Nigerian phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleStateChange = (state: string) => {
    setForm((prev) => ({ ...prev, state, city: "" }));
  };

  const handleCreateAccount = async () => {
    const fullPhone = "+234" + form.phone;
    const payload = { ...form, phone: fullPhone };
    setSubmitError("");
    setLoading(true);
    try {
      await authAPI.signup({
        businessName: payload.businessName,
        businessType: payload.businessType,
        ownerName: payload.ownerName,
        email: payload.email,
        phone: payload.phone,
      });
      try { sessionStorage.setItem("tablix_temp_reg", JSON.stringify(payload)); } catch (_) {}
      navigate("/otp", { state: { email: form.email, flow: "signup", form: payload } });
    } catch (err: any) {
      const msg = err?.data?.message ?? err?.message ?? "Failed to create account. Please try again.";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.businessName.trim() &&
    form.businessType &&
    form.ownerName.trim() &&
    form.ownerName.trim() &&
    form.email.trim() &&
    form.phone.length === 10 &&
    !phoneError &&
    form.state &&
    form.city;

  const cities = form.state ? NIGERIA_STATES[form.state] ?? [] : [];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background image + overlay */}
      <img
        src={imgFoodBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Hero text */}
      <div className="absolute left-6 w-[300px]" style={{ top: "8%" }}>
        <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 32, color: "#fff", lineHeight: "40px", margin: 0 }}>
          Simplify Sales,
        </p>
        <p style={{ fontFamily: INTER, fontWeight: 700, fontSize: 32, color: "#fff", lineHeight: "40px", margin: 0, marginTop: 4 }}>
          Amplify your business.
        </p>
      </div>

      {/* Bottom sheet container */}
      <div
        className="absolute bottom-0 left-0 right-0 page-card backdrop-blur-md flex flex-col items-center gap-5 px-5 pt-8 pb-10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] max-h-[82vh] overflow-y-auto"
        style={{ borderRadius: "32px 32px 0 0" }}
      >
        <div className="w-12 h-1 bg-gray-200 rounded-full -mt-2 mb-1 shrink-0" />

        <div className="flex flex-col items-center gap-1 text-center w-full">
          <p style={{ fontFamily: INTER, fontWeight: 800, fontSize: 24, color: "var(--page-text)" }}>Let's Create Your Account</p>
          <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-secondary)" }}>Signing up for tablix is fast and free</p>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* Business Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
              Business Name <span className="text-[#f04438]">*</span>
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
              <input
                type="text"
                placeholder="eg ABC Super Store"
                value={form.businessName}
                onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
                className="w-full text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Business Type */}
          <div className="flex flex-col gap-1.5 w-full">
            <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
              Business Type <span className="text-[#f04438]">*</span>
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
              <select
                value={form.businessType}
                onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))}
                className="w-full text-[15px] outline-none bg-transparent appearance-none"
                style={{ fontFamily: INTER, color: form.businessType ? "var(--page-text)" : "var(--c-text-placeholder)" }}
              >
                <option value="" disabled>Select Business Type</option>
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          {/* Owner Name */}
          <div className="flex flex-col gap-1.5 w-full">
            <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
              Owner Name <span className="text-[#f04438]">*</span>
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
              <input
                type="text"
                placeholder="eg John Doe"
                value={form.ownerName}
                onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))}
                className="w-full text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
              Email <span className="text-[#f04438]">*</span>
            </label>
            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
              <input
                type="email"
                placeholder="eg, help@tablix.com"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                style={{ fontFamily: INTER }}
              />
            </div>
          </div>

          {/* Phone — Nigerian format */}
          <div className="flex flex-col gap-1.5 w-full">
            <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
              Phone <span className="text-[#f04438]">*</span>
            </label>
            <div className={`flex items-center gap-2 rounded-xl border bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all ${phoneError ? "border-[#f04438]" : "border-[var(--page-border)]"}`}>
              <span className="pl-3 pr-2 py-2.5 text-[15px] text-[var(--page-text)] border-r border-[var(--page-border)] select-none whitespace-nowrap" style={{ fontFamily: INTER }}>
                🇳🇬 +234
              </span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="8012345678"
                value={form.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                maxLength={10}
                className="w-full text-[15px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent py-2.5"
                style={{ fontFamily: INTER }}
              />
            </div>
            {phoneError && (
              <p className="text-[#f04438] text-[12px]" style={{ fontFamily: INTER }}>
                {phoneError}
              </p>
            )}
          </div>

          {/* State & City — side by side */}
          <div className="flex gap-3 w-full">
            {/* State */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                State <span className="text-[#f04438]">*</span>
              </label>
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all relative">
                <select
                  value={form.state}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full text-[15px] text-[var(--page-text)] outline-none bg-transparent appearance-none cursor-pointer pr-6"
                  style={{ fontFamily: INTER }}
                >
                  <option value="" disabled>Select state</option>
                  {STATE_LIST.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-1.5 flex-1">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                City <span className="text-[#f04438]">*</span>
              </label>
              <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border page-border page-bg focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all relative ${!form.state ? "opacity-50" : ""}`}>
                <select
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  disabled={!form.state}
                  className="w-full text-[15px] text-[var(--page-text)] outline-none bg-transparent appearance-none cursor-pointer disabled:cursor-not-allowed pr-6"
                  style={{ fontFamily: INTER }}
                >
                  <option value="" disabled>Select city</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Error */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 p-3 rounded-xl w-full bg-red-50 border border-red-100 shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <p style={{ fontFamily: INTER, fontSize: 12, color: "#e91835", fontWeight: 500 }}>{submitError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleCreateAccount}
          disabled={!isFormValid || loading}
          className="w-full flex items-center justify-center h-11 rounded-xl text-white font-semibold transition-all shadow-sm active:scale-[0.98] mt-2 shrink-0 bg-[#e91835] hover:bg-[#d01530] disabled:bg-[#e91835]/20 disabled:text-white/30 disabled:cursor-not-allowed"
          style={{
            fontFamily: INTER,
            fontSize: 15,
          }}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-muted)", margin: 0, marginTop: 4 }}>
          Already have a Tablix account?{" "}
          <button
            onClick={() => navigate("/")}
            style={{ fontFamily: INTER, fontWeight: 700, color: "#e91835", background: "none", border: "none", cursor: "pointer" }}
          >
            Sign in
          </button>
        </p>

        <p style={{ fontFamily: INTER, fontSize: 11, color: "var(--page-text-muted)", textAlign: "center", lineHeight: "16px", marginTop: 4 }} className="shrink-0">
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <button type="button" onClick={() => onOpenModal("privacy")} className="text-[#e91835] underline decoration-solid focus:outline-none">Privacy Policy</button> and{" "}
          <button type="button" onClick={() => onOpenModal("terms")} className="text-[#e91835] underline decoration-solid focus:outline-none">Terms of Service</button> apply.
        </p>
      </div>
    </div>
  );
}

// ── Desktop Layout ──────────────────────────────────────────────────────────
function DesktopSignup({ onOpenModal }: { onOpenModal: (type: "privacy" | "terms") => void }) {
  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    ownerName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
  });
  const [phoneError, setPhoneError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (raw: string) => {
    let cleaned = raw.replace(/\D/g, "");
    if (cleaned.startsWith("234")) cleaned = cleaned.slice(3);
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);
    const digits = formatNigerianPhone(cleaned);
    setForm((prev) => ({ ...prev, phone: digits }));

    if (digits.length > 0 && digits.length < 10) {
      setPhoneError("Enter a valid 11-digit Nigerian number");
    } else if (digits.length === 10 && !isValidNigerianPhone(digits)) {
      setPhoneError("Invalid Nigerian phone number");
    } else {
      setPhoneError("");
    }
  };

  const handleStateChange = (state: string) => {
    setForm((prev) => ({ ...prev, state, city: "" }));
  };

  const handleCreateAccount = async () => {
    const fullPhone = "+234" + form.phone;
    const payload = { ...form, phone: fullPhone };
    setSubmitError("");
    setLoading(true);
    try {
      await authAPI.signup({
        businessName: payload.businessName,
        businessType: payload.businessType,
        ownerName: payload.ownerName,
        email: payload.email,
        phone: payload.phone,
      });
      try { sessionStorage.setItem("tablix_temp_reg", JSON.stringify(payload)); } catch (_) {}
      navigate("/otp", { state: { email: form.email, flow: "signup", form: payload } });
    } catch (err: any) {
      const msg = err?.data?.message ?? err?.message ?? "Failed to create account. Please try again.";
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    form.businessName.trim() &&
    form.businessType &&
    form.ownerName.trim() &&
    form.ownerName.trim() &&
    form.email.trim() &&
    form.phone.length === 10 &&
    !phoneError &&
    form.state &&
    form.city;

  const cities = form.state ? NIGERIA_STATES[form.state] ?? [] : [];

  return (
    <AuthLayout>
      <div className="w-full max-w-[480px] flex flex-col gap-6 items-center">
        {/* Logo */}
        <div className="transform scale-110 mb-2">
          <TablixLogo />
        </div>

        {/* Card wrapper */}
        <div className="w-full bg-[var(--page-bg)] rounded-2xl border border-[var(--page-border)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-1 text-center">
            <p style={{ fontFamily: INTER, fontWeight: 800, fontSize: 24, color: "var(--page-text)" }}>Let's Create Your Account</p>
            <p style={{ fontFamily: INTER, fontSize: 13, color: "var(--page-text-secondary)" }}>Signing up for tablix is fast and free</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Business Name */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                Business Name <span className="text-[#f04438]">*</span>
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
                <input
                  type="text"
                  placeholder="eg ABC Super Store"
                  value={form.businessName}
                  onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
                  className="w-full text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                  style={{ fontFamily: INTER }}
                />
              </div>
            </div>

            {/* Business Type */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                Business Type <span className="text-[#f04438]">*</span>
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all relative">
                <select
                  value={form.businessType}
                  onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))}
                  className="w-full text-[14.5px] outline-none bg-transparent appearance-none"
                  style={{ fontFamily: INTER, color: form.businessType ? "var(--page-text)" : "var(--c-text-placeholder)" }}
                >
                  <option value="" disabled>Select Business Type</option>
                  {BUSINESS_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Owner Name */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                Owner Name <span className="text-[#f04438]">*</span>
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
                <input
                  type="text"
                  placeholder="eg John Doe"
                  value={form.ownerName}
                  onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))}
                  className="w-full text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                  style={{ fontFamily: INTER }}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                Email <span className="text-[#f04438]">*</span>
              </label>
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all">
                <input
                  type="email"
                  placeholder="eg, help@tablix.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent"
                  style={{ fontFamily: INTER }}
                />
              </div>
            </div>

            {/* Phone — Nigerian format */}
            <div className="flex flex-col gap-1.5">
              <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                Phone <span className="text-[#f04438]">*</span>
              </label>
              <div className={`flex items-center gap-2 rounded-xl border bg-[var(--page-bg)] focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all ${phoneError ? "border-[#f04438]" : "border-[var(--page-border)]"}`}>
                <span className="pl-3.5 pr-2 py-2.5 text-[14.5px] text-[var(--page-text)] border-r border-[var(--page-border)] select-none whitespace-nowrap" style={{ fontFamily: INTER }}>
                  🇳🇬 +234
                </span>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="8012345678"
                  value={form.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  maxLength={10}
                  className="w-full text-[14.5px] text-[var(--page-text)] placeholder-[var(--c-text-placeholder)] outline-none bg-transparent py-2.5"
                  style={{ fontFamily: INTER }}
                />
              </div>
              {phoneError && (
                <p className="text-[#f04438] text-[12px]" style={{ fontFamily: INTER }}>
                  {phoneError}
                </p>
              )}
            </div>

            {/* State & City — side by side */}
            <div className="flex gap-4">
              {/* State */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                  State <span className="text-[#f04438]">*</span>
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all relative">
                  <select
                    value={form.state}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full text-[14.5px] text-[var(--page-text)] outline-none bg-transparent appearance-none cursor-pointer pr-6"
                    style={{ fontFamily: INTER }}
                  >
                    <option value="" disabled>Select state</option>
                    {STATE_LIST.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1.5 flex-1">
                <label style={{ fontFamily: INTER, fontWeight: 600, fontSize: 13, color: "var(--page-text)" }}>
                  City <span className="text-[#f04438]">*</span>
                </label>
                <div className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border page-border page-bg focus-within:bg-[var(--page-bg)] focus-within:border-[#e91835] focus-within:ring-2 focus-within:ring-[#e91835]/20 transition-all relative ${!form.state ? "opacity-50" : ""}`}>
                  <select
                    value={form.city}
                    onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                    disabled={!form.state}
                    className="w-full text-[14.5px] text-[var(--page-text)] outline-none bg-transparent appearance-none cursor-pointer disabled:cursor-not-allowed pr-6"
                    style={{ fontFamily: INTER }}
                  >
                    <option value="" disabled>Select city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Error */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-100"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#e91835" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <p style={{ fontFamily: INTER, fontSize: 12, color: "#e91835", fontWeight: 500 }}>{submitError}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleCreateAccount}
            disabled={!isFormValid || loading}
            className="w-full flex items-center justify-center h-11 rounded-xl text-white font-semibold transition-all shadow-sm active:scale-[0.98] mt-2 bg-[#e91835] hover:bg-[#d01530] disabled:bg-[#e91835]/20 disabled:text-white/30 disabled:cursor-not-allowed"
            style={{
              fontFamily: INTER,
              fontSize: 15,
            }}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </div>

        <p style={{ fontFamily: INTER, fontSize: 13.5, color: "var(--page-text-muted)", textAlign: "center" }}>
          Already have a Tablix account?{" "}
          <button
            onClick={() => navigate("/")}
            style={{ fontFamily: INTER, fontWeight: 700, color: "#e91835", background: "none", border: "none", cursor: "pointer" }}
          >
            Sign in
          </button>
        </p>

        <p style={{ fontFamily: INTER, fontSize: 12.5, color: "var(--page-text-muted)", textAlign: "center", lineHeight: "18px" }}>
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <button type="button" onClick={() => onOpenModal("privacy")} className="text-[#e91835] underline decoration-solid focus:outline-none">Privacy Policy</button> and{" "}
          <button type="button" onClick={() => onOpenModal("terms")} className="text-[#e91835] underline decoration-solid focus:outline-none">Terms of Service</button> apply.
        </p>
      </div>
    </AuthLayout>
  );
}

function AuthInfoModal({ type, onClose }: { type: "privacy" | "terms"; onClose: () => void }) {
  const isPrivacy = type === "privacy";
  const title = isPrivacy ? "Privacy Policy" : "Terms of Service";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal content box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-[560px] bg-[var(--page-bg)] rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-[var(--page-border)] z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--page-border)] shrink-0">
          <h3 style={{ fontFamily: INTER, fontWeight: 800, fontSize: 18, color: "var(--page-text)" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-50 focus:outline-none"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto text-[14px] text-[var(--page-text-muted)] leading-[22px] flex flex-col gap-4" style={{ fontFamily: INTER }}>
          {isPrivacy ? (
            <>
              <p className="font-semibold text-gray-900">1. Information We Collect</p>
              <p>We collect information to provide better POS services to our business owners. This includes your business name, owner name, email, phone number, and location details (state and city).</p>

              <p className="font-semibold text-gray-900">2. How We Use Information</p>
              <p>We use the information we collect to manage your Tablix account, facilitate transaction processing, log business operations (such as inventory, staff logins, and sales), and provide customer support.</p>

              <p className="font-semibold text-gray-900">3. Data Integrity & Security</p>
              <p>Your POS data (sales records, inventory, staff data) is stored securely. We take appropriate measures, including encryption and strict authentication controls, to protect your business information from unauthorized access.</p>

              <p className="font-semibold text-gray-900">4. Third-Party Services</p>
              <p>Our platform integrates with payment gateways (such as Paystack) for subscription management. These services are subject to their own respective privacy policies.</p>

              <p className="font-semibold text-gray-900">5. Updates to This Policy</p>
              <p>We may update this Privacy Policy from time to time to reflect changes in our business practices or POS service enhancements.</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900">1. Acceptable Use of Tablix POS</p>
              <p>Tablix POS provides sales, inventory, and restaurant management tools. You agree to use our software solely for lawful commercial operations and maintain strict confidentiality of your access PINs.</p>

              <p className="font-semibold text-gray-900">2. Account Registration</p>
              <p>You must provide accurate and complete information during registration. You are responsible for all activity logging and POS transactions occurring under your Tablix business account.</p>

              <p className="font-semibold text-gray-900">3. Software Availability & Latency</p>
              <p>While we strive to provide uninterrupted service with low latency, service disruptions may occur. Tablix is provided "as is" and "as available". We do not guarantee continuous uptime.</p>

              <p className="font-semibold text-gray-900">4. Limitation of Liability</p>
              <p>In no event shall Tablix POS or its team be liable for any loss of sales, profits, data, or business opportunities arising from the use or inability to use the system.</p>

              <p className="font-semibold text-gray-900">5. Termination</p>
              <p>We reserve the right to suspend or terminate your account access if any terms are breached or for any fraudulent transaction activity detected on the terminal.</p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-[var(--page-border)] flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#e91835] hover:bg-[#d01530] text-white font-semibold rounded-xl text-[14px] transition-colors shadow-sm focus:outline-none"
            style={{ fontFamily: INTER }}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Page entry point ──────────────────────────────────────────────────────────
export default function SignupPage() {
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
      {/* Mobile layout (< lg) */}
      <div className="block lg:hidden h-screen">
        <MobileSignup onOpenModal={setActiveModal} />
      </div>
      {/* Desktop layout (>= lg) */}
      <div className="hidden lg:block">
        <DesktopSignup onOpenModal={setActiveModal} />
      </div>

      <AnimatePresence>
        {activeModal && (
          <AuthInfoModal type={activeModal} onClose={() => setActiveModal(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

