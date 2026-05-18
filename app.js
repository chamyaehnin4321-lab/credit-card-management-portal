const PAGE_SIZE = 30;

const statuses = [
  "NEW",
  "ASSIGNED",
  "IN_PROCESS",
  "INCOMPLETE",
  "INSUFFICIENT",
  "CANCELLED",
  "PENDING_APPROVAL",
  "APPROVED_READY_TO_ISSUE",
  "COMPLETE",
];

const stages = ["Super", "Operator", "Branch"];
const branchModules = ["Approved Card List", "Ready to Issue", "Completed Card List"];
const branchNames = ["Yangon Main Branch", "Mandalay Branch", "Naypyitaw Branch", "Taunggyi Branch", "Mawlamyine Branch"];
const coreCustomers = {
  "12345678901234567": {
    applicantName: "Daw Thiri Htet",
    fatherName: "U Hla Myint",
    nrc: "12/LMN(N)123456",
    mobile: "09421555019",
    email: "thiri.htet@example.com",
  },
  "98765432109876543": {
    applicantName: "U Kyaw Zin Oo",
    fatherName: "U Tin Oo",
    nrc: "9/MHT(N)778899",
    mobile: "09788342201",
    email: "kyaw.zin@example.com",
  },
};

const users = [
  { id: "super-001", name: "Daw May Thu", role: "Super" },
  { id: "op-001", name: "Daw Hnin Wut Yee", role: "Operator" },
  { id: "op-002", name: "U Min Zaw", role: "Operator" },
  { id: "branch-001", name: "Yangon Main Branch", role: "Branch", branchCode: "YGN-001" },
];

const state = {
  userId: users[0].id,
  module: "Hub",
  search: "",
  status: "ALL",
  stage: "ALL",
  dateFrom: "",
  dateTo: "",
  filterDraft: {
    search: "",
    status: "ALL",
    stage: "ALL",
    dateFrom: "",
    dateTo: "",
  },
  sortDirection: "desc",
  page: 1,
  dialog: null,
  toast: "",
  formErrors: [],
  formSubmitted: false,
  branchForm: createBlankBranchForm(),
};

const applications = createApplications();

function createBlankBranchForm() {
  return {
    cardBrand: "VISA",
    cardType: "Platinum",
    creditLimitAmount: "2000000",
    autoDebitAccountNumber: "",
    paymentType: "Full",
    collectionBranch: "Yangon Main Branch",
    salutation: "Mr",
    gender: "Male",
    applicantName: "",
    fatherName: "",
    nrc: "",
    nationality: "Myanmar National",
    nationalityOther: "",
    dob: "",
    age: "",
    occupation: "Employee",
    maritalStatus: "Single",
    dependents: "",
    familyMembersWorking: "",
    educationLevel: "Graduate",
    residentialStatus: "Owned",
    addressNo: "",
    addressStreet: "",
    addressWard: "",
    addressStateDivision: "",
    addressDistrict: "",
    addressTownship: "",
    addressTown: "",
    mobile: "",
    email: "",
    companyName: "",
    natureOfBusiness: "",
    kbzPayAccountNo: "",
    designation: "",
    department: "",
    termOfEmployment: "",
    salariedBankName: "",
    salariedBankAccountNo: "",
    monthlyIncome: "",
    lengthOfService: "",
    serviceYear: "",
    serviceMonth: "",
    officePhone: "",
    officeExt: "",
    officeAddress: "",
    officeNo: "",
    officeStreet: "",
    officeWard: "",
    officeTownship: "",
    officeTown: "",
    guarantorName: "",
    guarantorNrc: "",
    guarantorFatherName: "",
    guarantorDob: "",
    guarantorNationality: "",
    guarantorMobile: "",
    guarantorEmail: "",
    guarantorAddress: "",
    guarantorCompanyName: "",
    guarantorNatureOfBusiness: "",
    guarantorMonthlyIncome: "",
    guarantorIncomeAccount: "",
    guarantorIncomeBankName: "",
    guarantorDepartment: "",
    guarantorDesignation: "",
    guarantorTermOfEmployment: "Permanent",
    guarantorLengthOfService: "",
    guarantorOfficePhone: "",
    guarantorOfficeAddress: "",
    referenceName: "",
    referencePhone: "",
    referenceAddress: "",
    applicantDocNrcFront: "",
    applicantDocNrcBack: "",
    applicantDocHousehold: "",
    applicantDocElectricity: "",
    applicantDocIncomeProof: "",
    applicantDocHrLetter: "",
    applicantDocBusinessLicense: "",
    guarantorDocNrc: "",
    guarantorDocHousehold: "",
    guarantorDocElectricity: "",
    guarantorDocIncomeProof: "",
    supplementaryCards: [createSupplementaryCard()],
  };
}

function createSupplementaryCard() {
  return {
    applicantName: "",
    nrc: "",
    relationship: "",
    dob: "",
    phone: "",
    email: "",
    gender: "Male",
    docNrcCopy: "",
  };
}

function createApplications() {
  const names = [
    "Daw Thiri Htet",
    "U Kyaw Zin Oo",
    "Daw Nandar Win",
    "U Thet Paing",
    "Daw Khin Waddy",
    "U Min Khant",
    "Daw Aye Chan",
    "U Hein Htet",
    "Daw May Thazin",
    "U Zaw Lin",
    "Daw Ei Mon",
    "U Aung Kyaw",
  ];
  const nrcPrefixes = ["12/LMN", "9/MHT", "14/PTH", "7/PTN", "12/OKM", "5/MYA"];
  const operators = ["op-001", "op-002"];
  const statusPattern = [
    "NEW",
    "NEW",
    "ASSIGNED",
    "ASSIGNED",
    "IN_PROCESS",
    "IN_PROCESS",
    "PENDING_APPROVAL",
    "APPROVED_READY_TO_ISSUE",
    "APPROVED_READY_TO_ISSUE",
    "COMPLETE",
    "INCOMPLETE",
    "INSUFFICIENT",
    "CANCELLED",
  ];

  return Array.from({ length: 82 }, (_, index) => {
    const status = statusPattern[index % statusPattern.length];
    const sequence = index + 1;
    const appliedDate = new Date("2026-05-10T09:30:00+06:30");
    appliedDate.setHours(appliedDate.getHours() - index * 4);
    const amount = 800000 + (index % 11) * 350000;
    const isBranchCreated = index % 7 === 0;
    const branchCode = index % 2 === 0 ? "YGN-001" : "MDY-002";
    const assignedOperatorId = status === "NEW" ? "" : operators[index % operators.length];
    const approvedAmount = status === "APPROVED_READY_TO_ISSUE" || status === "COMPLETE" ? amount - 100000 : null;

    return {
      id: `SSBP-CC-2026-${String(sequence).padStart(4, "0")}`,
      documentNo: `DOC-${appliedDate.getFullYear()}-${String(620000 + sequence)}`,
      applicationChannel: isBranchCreated ? "Branch" : "SSBP",
      applicationType: isBranchCreated ? "Branch Created New Application" : "Credit Card New Application",
      applicantName: names[index % names.length],
      nrc: `${nrcPrefixes[index % nrcPrefixes.length]}(N)${String(120000 + index * 137).slice(0, 6)}`,
      creditLimitAmount: amount,
      approvedAmount,
      appliedAt: appliedDate.toISOString(),
      stage: stageForStatus(status),
      status,
      assignedOperatorId,
      branchCode,
      cardStage: cardStageForStatus(status, index),
      preapprovedComment: status === "PENDING_APPROVAL" ? "Operator preapproved after document and KYC review." : "",
      history: initialHistory(status, assignedOperatorId, branchCode),
    };
  });
}

function initialHistory(status, assignedOperatorId, branchCode) {
  const items = [
    historyItem("System", "Application received from source channel.", "NEW"),
  ];

  if (assignedOperatorId) {
    items.unshift(historyItem("Super", `Assigned to ${userName(assignedOperatorId)}.`, "ASSIGNED"));
  }

  if (status === "IN_PROCESS") {
    items.unshift(historyItem("Operator", "Moved to InProcess for review.", "IN_PROCESS"));
  }

  if (status === "PENDING_APPROVAL") {
    items.unshift(historyItem("Operator", "PreApproved and submitted to Super MyBox.", "PENDING_APPROVAL"));
  }

  if (status === "APPROVED_READY_TO_ISSUE") {
    items.unshift(historyItem("Super", `Final approved and routed to branch ${branchCode}.`, "APPROVED_READY_TO_ISSUE"));
  }

  if (status === "COMPLETE") {
    items.unshift(historyItem("Branch", "Customer picked up card. Thank-you SMS sent.", "COMPLETE"));
  }

  if (status === "INCOMPLETE") {
    items.unshift(historyItem("Operator", "Requested customer document resubmission. SMS and SSBP MyOrder update sent.", "INCOMPLETE"));
  }

  if (status === "INSUFFICIENT") {
    items.unshift(historyItem("Operator", "Requested customer balance or information update. SMS and SSBP MyOrder update sent.", "INSUFFICIENT"));
  }

  if (status === "CANCELLED") {
    items.unshift(historyItem("Operator", "Cancelled due to KYC mismatch. SMS and SSBP MyOrder update sent.", "CANCELLED"));
  }

  return items;
}

function historyItem(actor, remark, status) {
  return {
    actor,
    remark,
    status,
    at: new Date().toISOString(),
  };
}

function stageForStatus(status) {
  if (status === "APPROVED_READY_TO_ISSUE" || status === "COMPLETE") return "Branch";
  if (status === "PENDING_APPROVAL" || status === "NEW") return "Super";
  return "Operator";
}

function cardStageForStatus(status, index) {
  if (status === "COMPLETE") return "COMPLETED_CARD_LIST";
  if (status === "APPROVED_READY_TO_ISSUE" && index % 3 === 0) return "READY_TO_ISSUE";
  if (status === "APPROVED_READY_TO_ISSUE") return "APPROVED_CARD_LIST";
  return "";
}

function currentUser() {
  return users.find((user) => user.id === state.userId) || users[0];
}

function operators() {
  return users.filter((user) => user.role === "Operator");
}

function userName(id) {
  return users.find((user) => user.id === id)?.name || "-";
}

function modulesForRole(role) {
  if (role === "Super") {
    return ["Hub", "Submit", "MyBox", "InProcess", "Approved Card List", "Ready to Issue", "Completed Card List", "SSBP Process Flow"];
  }

  if (role === "Operator") {
    return ["Submit", "MyBox", "InProcess", "SSBP Process Flow"];
  }

  return ["Create New Application", "Approved Card List", "Ready to Issue", "Completed Card List", "SSBP Process Flow"];
}

function moduleDescription(module) {
  if (currentUser().role === "Super" && isBranchModule(module)) {
    return "View-only branch oversight to monitor branch and customer interaction status.";
  }

  const descriptions = {
    Hub: "New SSBP and Branch-created requests waiting for Super assignment.",
    Submit: "Assigned requests associated with operators.",
    MyBox: currentUser().role === "Super" ? "Operator PreApproved requests waiting for final decision." : "Assigned requests received from Super.",
    InProcess: "Applications currently under operational review.",
    "Approved Card List": "Super final approved card requests waiting for branch readiness notification.",
    "Ready to Issue": "Cards ready for customer pickup at the selected branch.",
    "Completed Card List": "Completed card pickup records.",
    "Create New Application": "Create a branch-originated credit card application for customer walk-in requests.",
    "SSBP Process Flow": "End-to-end process flow for SSBP new credit card applications.",
  };

  return descriptions[module] || "";
}

function recordsForModule() {
  const user = currentUser();
  return applications
    .filter((item) => hasRoleAccess(item, user))
    .filter((item) => belongsToModule(item, state.module, user))
    .filter(matchesSearch)
    .filter(matchesStatusFilter)
    .filter(matchesStageFilter)
    .filter(matchesDateFilter)
    .sort((left, right) => {
      const leftTime = new Date(left.appliedAt).getTime();
      const rightTime = new Date(right.appliedAt).getTime();
      return state.sortDirection === "desc" ? rightTime - leftTime : leftTime - rightTime;
    });
}

function hasRoleAccess(item, user) {
  if (user.role === "Super") return true;
  if (user.role === "Operator") return item.assignedOperatorId === user.id;
  return item.status === "APPROVED_READY_TO_ISSUE" || item.status === "COMPLETE";
}

function belongsToModule(item, module, user) {
  if (module === "Create New Application" || module === "SSBP Process Flow") {
    return false;
  }

  if (module === "Hub") {
    return user.role === "Super" && item.status === "NEW";
  }

  if (module === "Submit") {
    if (user.role === "Super") return item.status === "ASSIGNED";
    return user.role === "Operator" && item.status === "ASSIGNED";
  }

  if (module === "MyBox") {
    if (user.role === "Super") return item.status === "PENDING_APPROVAL";
    return user.role === "Operator" && item.status === "ASSIGNED";
  }

  if (module === "InProcess") {
    return item.status === "IN_PROCESS";
  }

  if (module === "Approved Card List") {
    return item.status === "APPROVED_READY_TO_ISSUE" && item.cardStage === "APPROVED_CARD_LIST";
  }

  if (module === "Ready to Issue") {
    return item.status === "APPROVED_READY_TO_ISSUE" && item.cardStage === "READY_TO_ISSUE";
  }

  if (module === "Completed Card List") {
    return item.status === "COMPLETE";
  }

  return false;
}

function matchesSearch(item) {
  const keyword = state.search.trim().toLowerCase();
  if (!keyword) return true;

  return [
    item.documentNo,
    item.applicationChannel,
    item.applicationType,
    item.applicantName,
    item.nrc,
  ]
    .join(" ")
    .toLowerCase()
    .includes(keyword);
}

function matchesStatusFilter(item) {
  return state.status === "ALL" || item.status === state.status;
}

function matchesStageFilter(item) {
  return state.stage === "ALL" || item.stage === state.stage;
}

function matchesDateFilter(item) {
  const applied = new Date(item.appliedAt);
  if (state.dateFrom && applied < new Date(`${state.dateFrom}T00:00:00`)) return false;
  if (state.dateTo && applied > new Date(`${state.dateTo}T23:59:59`)) return false;
  return true;
}

function formatCurrency(amount) {
  return `MMK ${Number(amount).toLocaleString("en-US")}`;
}

function formatApproved(amount) {
  return amount === null ? "Pending" : formatCurrency(amount);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function readableStatus(status) {
  return status.replaceAll("_", " ");
}

function statusClass(status) {
  return status.toLowerCase().replaceAll("_", "-");
}

function render() {
  const user = currentUser();
  const allowedModules = modulesForRole(user.role);
  if (!allowedModules.includes(state.module)) {
    state.module = allowedModules[0];
  }

  document.getElementById("app").innerHTML = `
    <div class="layout">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-mark">KBZ</div>
          <div>
            <div class="brand-title">Credit Card Management Portal</div>
            <div class="brand-subtitle">SSBP & Branch New Application</div>
          </div>
        </div>
        <nav class="nav">
          ${allowedModules.map(renderNavButton).join("")}
        </nav>
        <div class="role-panel">
          <label>Current User</label>
          <select id="userSelect">
            ${users.map((item) => option(item.id, `${item.name} - ${item.role}`, state.userId)).join("")}
          </select>
        </div>
      </aside>
      <main class="main">
        <header class="topbar">
          <div>
            <p class="eyebrow">KBZ Bank Operations</p>
            <h1>${escapeHtml(state.module)}</h1>
            <small>${escapeHtml(moduleDescription(state.module))}</small>
          </div>
        </header>
        <section class="content">
          ${state.toast ? `<div class="toast">${escapeHtml(state.toast)}</div>` : ""}
          ${renderModule()}
        </section>
      </main>
      ${renderDialog()}
    </div>
  `;

  bindEvents();
}

function renderNavButton(module) {
  const branchClass = isBranchModule(module) ? " branch-module" : "";
  return `<button class="${state.module === module ? "active" : ""}${branchClass}" data-module="${module}">${escapeHtml(module)}</button>`;
}

function renderModule() {
  if (state.module === "Create New Application") {
    return renderBranchApplicationForm();
  }

  if (state.module === "SSBP Process Flow") {
    return renderSsbpProcessFlow();
  }

  const records = recordsForModule();
  const pageCount = Math.max(1, Math.ceil(records.length / PAGE_SIZE));
  state.page = Math.min(state.page, pageCount);
  const start = (state.page - 1) * PAGE_SIZE;
  const pageRows = records.slice(start, start + PAGE_SIZE);

  return `
    ${renderFilters()}
    ${renderTable(pageRows, records.length, start, pageCount)}
  `;
}

function renderFilters() {
  return `
    <section class="panel filters">
      <div class="filter-grid">
        <div class="field">
          <label>Search</label>
          <input id="search" value="${escapeAttr(state.filterDraft.search)}" placeholder="Document no, channel, type, applicant, NRC" />
        </div>
        <div class="field">
          <label>Status</label>
          <select id="status">${option("ALL", "All Statuses", state.filterDraft.status)}${statuses.map((status) => option(status, readableStatus(status), state.filterDraft.status)).join("")}</select>
        </div>
        <div class="field">
          <label>Stage</label>
          <select id="stage">${option("ALL", "All Stages", state.filterDraft.stage)}${stages.map((stage) => option(stage, stage, state.filterDraft.stage)).join("")}</select>
        </div>
        <div class="field">
          <label>Applied From</label>
          <input id="dateFrom" type="date" value="${escapeAttr(state.filterDraft.dateFrom)}" />
        </div>
        <div class="field">
          <label>Applied To</label>
          <input id="dateTo" type="date" value="${escapeAttr(state.filterDraft.dateTo)}" />
        </div>
        <div class="field filter-action">
          <label>Action</label>
          <button id="applyFilters" class="search-button" type="button">Search</button>
        </div>
      </div>
    </section>
  `;
}

function renderBranchApplicationForm() {
  const form = state.branchForm;
  return `
    <section class="panel branch-form-panel">
      <div class="panel-header">
        <div>
          <h2>Branch New Application</h2>
          <p>Submitted records follow the same approval flow as SSBP applications and will appear in Super Hub as NEW.</p>
        </div>
      </div>
      <div class="branch-form">
        ${state.formSubmitted && state.formErrors.length ? `<div class="error-box">${state.formErrors.map((error) => `<div>${escapeHtml(error)}</div>`).join("")}</div>` : ""}
        <div class="form-section">
          <h3>Application Information</h3>
          <div class="form-grid">
            ${selectField("cardBrand", "Card Brand", ["VISA", "MPU-UPI", "MPU"], true)}
            ${selectField("cardType", "Card Type", cardTypeOptions(form.cardBrand), true)}
            ${field("creditLimitAmount", "Credit Limit Amount", "number", true)}
            ${field("autoDebitAccountNumber", "Auto Debit Account Number", "text", true, "17 digits")}
            ${selectField("paymentType", "Payment Type", ["Full", "Partial"], true)}
            ${selectField("collectionBranch", "Collection Branch", branchNames, true)}
          </div>
          <div class="form-actions-inline">
            <button class="secondary-button" id="loadCoreCustomer" type="button">Load Applicant from Core</button>
            <span>Applicant Name, Father's Name, and NRC are not editable after core lookup.</span>
          </div>
        </div>

        <div class="form-section">
          <h3>Personal Details</h3>
          <div class="form-grid">
            ${selectField("salutation", "Salutation", ["Mr", "Mrs/Ms"], true)}
            ${selectField("gender", "Gender", ["Male", "Female"], true)}
            ${field("applicantName", "Applicant Name", "text", true, "Loaded from Core", true)}
            ${field("fatherName", "Father's Name", "text", true, "Loaded from Core", true)}
            ${field("nrc", "NRC/Passport No.", "text", true, "Loaded from Core", true)}
            ${selectField("nationality", "Nationality", ["Myanmar National", "Other"], true)}
            ${form.nationality === "Other" ? field("nationalityOther", "Other Nationality", "text", true) : ""}
            ${field("dob", "Date of Birth", "date", true)}
            ${field("age", "Age", "number", true, "Auto calculated", true)}
            ${selectField("occupation", "Occupation", ["Employee", "Self-Employed"], true)}
            ${selectField("maritalStatus", "Marital Status", ["Single", "Married", "Widowed", "Divorced"], true)}
            ${field("dependents", "No. of Dependents", "number", true)}
            ${field("familyMembersWorking", "Family Members Working", "number", true)}
            ${selectField("educationLevel", "Education Level", ["Primary School", "Secondary School", "Graduate", "Postgraduate"], true)}
            ${selectField("residentialStatus", "Residential Status", ["Owned", "Parents/Relatives", "Tenant"], true)}
            ${field("mobile", "Mobile No.", "tel", true)}
            ${field("email", "Email", "email", true)}
          </div>
          <h4>Residential Address</h4>
          <div class="form-grid address-grid">
            ${field("addressNo", "No", "text", true)}
            ${field("addressStreet", "Street", "text", true)}
            ${field("addressWard", "Ward", "text", true)}
            ${field("addressStateDivision", "State/Division", "text", true)}
            ${field("addressDistrict", "District", "text", true)}
            ${field("addressTownship", "Township", "text", true)}
            ${field("addressTown", "Town", "text", true)}
          </div>
        </div>

        <div class="form-section">
          <h3>Applicant Employment Information</h3>
          <div class="form-grid">
            ${field("companyName", "Company Name", "text", true)}
            ${field("natureOfBusiness", "Nature of Business", "text", true)}
            ${field("kbzPayAccountNo", "KBZPay Account No.", "text", true)}
            ${field("designation", "Designation", "text", true)}
            ${field("department", "Department", "text", true)}
            ${field("termOfEmployment", "Term of Employment", "text", true)}
            ${field("salariedBankName", "Salaried Bank Name", "text", true)}
            ${field("salariedBankAccountNo", "Salaried Bank Account No.", "text", true)}
            ${field("monthlyIncome", "Monthly Income", "number", true)}
            ${field("lengthOfService", "Length of Service", "text", true)}
            ${field("serviceYear", "Year", "number", true)}
            ${field("serviceMonth", "Monthly", "number", true)}
            ${field("officePhone", "Office Phone", "tel", true)}
            ${field("officeExt", "Ext", "text", true)}
            ${field("officeAddress", "Office Address", "text", true)}
            ${field("officeNo", "Office No", "text", true)}
            ${field("officeStreet", "Office Street", "text", true)}
            ${field("officeWard", "Office Ward", "text", true)}
            ${field("officeTownship", "Office Township", "text", true)}
            ${field("officeTown", "Office Town", "text", true)}
          </div>
        </div>

        <div class="form-section optional-section">
          <h3>Guarantor Information</h3>
          <p>Optional. If entered, age must be 21 to 65 and phone numbers must not match the applicant mobile number.</p>
          <div class="form-grid">
            ${field("guarantorName", "Name", "text")}
            ${field("guarantorNrc", "NRC/Passport No.", "text")}
            ${field("guarantorFatherName", "Father Name", "text")}
            ${field("guarantorDob", "Date of Birth", "date")}
            ${field("guarantorNationality", "Nationality", "text")}
            ${field("guarantorMobile", "Mobile Phone Number", "tel")}
            ${field("guarantorEmail", "Email Address", "email")}
            ${field("guarantorAddress", "Residential Address", "text")}
            ${field("guarantorCompanyName", "Company / Business Name", "text")}
            ${field("guarantorNatureOfBusiness", "Nature of Business", "text")}
            ${field("guarantorMonthlyIncome", "Monthly Salary / Income", "number")}
            ${field("guarantorIncomeAccount", "Salary / KBZPay A/C", "text")}
            ${field("guarantorIncomeBankName", "Salary Income Bank Name", "text")}
            ${field("guarantorDepartment", "Department", "text")}
            ${field("guarantorDesignation", "Designation", "text")}
            ${selectField("guarantorTermOfEmployment", "Term of Employment", ["Contract", "Permanent", "Owner"])}
            ${field("guarantorLengthOfService", "Length of Service / Establish From", "text")}
            ${field("guarantorOfficePhone", "Office Phone Number", "tel")}
            ${field("guarantorOfficeAddress", "Office Address", "text")}
          </div>
        </div>

        <div class="form-section optional-section">
          <h3>Reference Details</h3>
          <div class="form-grid">
            ${field("referenceName", "Reference Person Name", "text")}
            ${field("referencePhone", "Reference Person Phone Number", "tel")}
            ${field("referenceAddress", "Residential Address", "text")}
          </div>
        </div>

        <div class="form-section">
          <h3>Supporting Document for Applicant</h3>
          <div class="form-grid">
            ${fileField("applicantDocNrcFront", "NRC Front", true)}
            ${fileField("applicantDocNrcBack", "NRC Back", true)}
            ${fileField("applicantDocHousehold", "Household Registration", true)}
            ${fileField("applicantDocElectricity", "Electricity Bill Latest", true)}
            ${fileField("applicantDocIncomeProof", form.occupation === "Employee" ? "3 Month Pay Slip / Bank Statement" : "3 Month Bank Statement", true)}
            ${form.occupation === "Employee" ? fileField("applicantDocHrLetter", "HR Recommendation Letter", true) : fileField("applicantDocBusinessLicense", "DICA / Business License", true)}
          </div>
        </div>

        <div class="form-section optional-section">
          <h3>Supporting Document for Guarantor</h3>
          <div class="form-grid">
            ${fileField("guarantorDocNrc", "Guarantor NRC Copy")}
            ${fileField("guarantorDocHousehold", "Guarantor Household Registration")}
            ${fileField("guarantorDocElectricity", "Guarantor Electricity Bill")}
            ${fileField("guarantorDocIncomeProof", "Guarantor Income Proof")}
          </div>
        </div>

        <div class="form-section optional-section">
          <div class="section-title-row">
            <div>
              <h3>Supplementary Card Detail</h3>
              <p>Optional. Maximum 4 supplementary cards.</p>
            </div>
            <button class="secondary-button" id="addSupplementary" type="button" ${form.supplementaryCards.length >= 4 ? "disabled" : ""}>+ Add</button>
          </div>
          <div class="supplementary-list">
            ${form.supplementaryCards.map(renderSupplementaryCard).join("")}
          </div>
        </div>

        <div class="form-footer">
          <button class="primary-button" id="submitBranchApplication" type="button">Submit Branch Application</button>
          <button class="secondary-button" id="resetBranchApplication" type="button">Reset</button>
        </div>
      </div>
    </section>
  `;
}

function renderSsbpProcessFlow() {
  const steps = [
    ["Customer Submit", "Customer applies from SSBP with personal information, card product, credit limit, documents, signature, and OTP verification."],
    ["Portal Sync", "Application is synchronized into Credit Card Management Portal with status NEW."],
    ["Super Hub", "Super reviews new applications and assigns each request to a dedicated Operator."],
    ["Operator MyBox", "Assigned Operator opens MyBox and moves the request to InProcess."],
    ["Operator InProcess", "Operator verifies customer data, NRC, documents, requested limit, and supplementary details."],
    ["Customer Request or Cancel", "If information is incomplete, insufficient, or KYC mismatch occurs, SMS and SSBP MyOrder updates are recorded."],
    ["PreApproved", "Operator PreApproves eligible applications and submits them to Super MyBox."],
    ["Super Approval", "Super reviews operator comment, history, and request details before final approval."],
    ["Approved Card List", "Final approved request moves to Branch Approved Card List for card collection handling."],
    ["Ready to Issue", "Branch marks the card ready for pickup and records customer pickup SMS."],
    ["Completed", "Customer collects the card. Branch moves the record to Completed Card List and records thank-you SMS."],
  ];

  return `
    <section class="panel flow-panel">
      <div class="panel-header">
        <div>
          <h2>SSBP New Application Process Flow</h2>
          <p>Operational status path from customer submission through completed card pickup.</p>
        </div>
      </div>
      <div class="flow-grid">
        ${steps
          .map(
            ([title, detail], index) => `
              <article class="flow-step">
                <span>${String(index + 1).padStart(2, "0")}</span>
                <h3>${escapeHtml(title)}</h3>
                <p>${escapeHtml(detail)}</p>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function field(name, label, type = "text", required = false, placeholder = "", readonly = false) {
  const value = state.branchForm[name] || "";
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}${required ? ' <em>*</em>' : ""}</span>
      <input data-branch-field="${name}" type="${type}" value="${escapeAttr(value)}" placeholder="${escapeAttr(placeholder)}" ${readonly ? "readonly" : ""} />
    </label>
  `;
}

function selectField(name, label, values, required = false) {
  const selected = state.branchForm[name] || values[0] || "";
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}${required ? ' <em>*</em>' : ""}</span>
      <select data-branch-field="${name}">
        ${values.map((value) => option(value, value, selected)).join("")}
      </select>
    </label>
  `;
}

function fileField(name, label, required = false) {
  const selectedFile = state.branchForm[name];
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}${required ? ' <em>*</em>' : ""}</span>
      <input data-branch-field="${name}" type="file" />
      ${selectedFile ? `<small>${escapeHtml(selectedFile)}</small>` : ""}
    </label>
  `;
}

function renderSupplementaryCard(card, index) {
  return `
    <div class="supplementary-card">
      <div class="section-title-row">
        <h4>Supplementary Card ${index + 1}</h4>
        ${index > 0 ? `<button class="text-button" data-remove-supplementary="${index}" type="button">Remove</button>` : ""}
      </div>
      <div class="form-grid">
        ${suppField(index, "applicantName", "Applicant Name")}
        ${suppField(index, "nrc", "NRC/Passport No.")}
        ${suppField(index, "relationship", "Relationship")}
        ${suppField(index, "dob", "Date of Birth", "date")}
        ${suppField(index, "phone", "Phone Number", "tel")}
        ${suppField(index, "email", "Email Address", "email")}
        ${suppSelect(index, "gender", "Gender", ["Male", "Female"])}
        ${suppFile(index, "docNrcCopy", "NRC Copy")}
      </div>
    </div>
  `;
}

function suppField(index, name, label, type = "text") {
  const value = state.branchForm.supplementaryCards[index][name] || "";
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}</span>
      <input data-supp-index="${index}" data-supp-field="${name}" type="${type}" value="${escapeAttr(value)}" />
    </label>
  `;
}

function suppSelect(index, name, label, values) {
  const selected = state.branchForm.supplementaryCards[index][name] || values[0];
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}</span>
      <select data-supp-index="${index}" data-supp-field="${name}">
        ${values.map((value) => option(value, value, selected)).join("")}
      </select>
    </label>
  `;
}

function suppFile(index, name, label) {
  const selectedFile = state.branchForm.supplementaryCards[index][name] || "";
  return `
    <label class="form-field">
      <span>${escapeHtml(label)}</span>
      <input data-supp-index="${index}" data-supp-field="${name}" type="file" />
      ${selectedFile ? `<small>${escapeHtml(selectedFile)}</small>` : ""}
    </label>
  `;
}

function cardTypeOptions(cardBrand) {
  if (cardBrand === "MPU") return ["Platinum", "Gold", "Classic"];
  return ["Platinum", "Classic"];
}

function renderTable(pageRows, recordCount, start, pageCount) {
  return `
    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>${escapeHtml(state.module)} Queue</h2>
          <p>${escapeHtml(actionHint())}</p>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Document No</th>
              <th>Application Channel</th>
              <th>Application Type</th>
              <th>Applicant Name</th>
              <th>NRC</th>
              <th class="num">Credit Limit Amount</th>
              <th class="num">Approved Amount</th>
              <th>Applied Date</th>
              <th>Stage</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${
              pageRows.length
                ? pageRows.map((item, index) => renderRow(item, start + index + 1)).join("")
                : `<tr><td colspan="12" class="placeholder">No applications match this module and filter selection.</td></tr>`
            }
          </tbody>
        </table>
      </div>
      <div class="pagination">
        <span>Showing ${pageRows.length} of ${recordCount} records</span>
        <div>
          <button id="prevPage" ${state.page === 1 ? "disabled" : ""}>Previous</button>
          <button id="nextPage" ${state.page === pageCount ? "disabled" : ""}>Next</button>
        </div>
      </div>
    </section>
  `;
}

function actionHint() {
  if (state.module === "Hub") return "Click Document No to assign the request to a dedicated operator.";
  if (state.module === "MyBox") return currentUser().role === "Super" ? "Review operator PreApproved requests for final approval." : "Click Document No to move assigned request to InProcess.";
  if (state.module === "InProcess") return "Hover a row to request customer update, cancel, view, history, or approve/preapprove.";
  if (currentUser().role === "Super" && isBranchModule(state.module)) return "Super view-only oversight: use View Application and View History to check branch and customer interaction.";
  if (state.module === "Approved Card List") return "Hover a row to move the card request to Ready to Issue and send pickup SMS.";
  if (state.module === "Ready to Issue") return "Hover a row to mark customer pickup as completed and send thank-you SMS.";
  return "Use filters and Applied Date sorting to manage the queue.";
}

function renderRow(item, rowNumber) {
  return `
    <tr>
      <td class="nowrap">${rowNumber}</td>
      <td class="doc nowrap">${renderDocumentAction(item)}</td>
      <td class="nowrap">${escapeHtml(item.applicationChannel)}</td>
      <td>${escapeHtml(item.applicationType)}</td>
      <td class="nowrap">${escapeHtml(item.applicantName)}</td>
      <td class="nowrap">${escapeHtml(item.nrc)}</td>
      <td class="num">${formatCurrency(item.creditLimitAmount)}</td>
      <td class="num">${formatApproved(item.approvedAmount)}</td>
      <td class="nowrap">${formatDate(item.appliedAt)}</td>
      <td class="nowrap">${escapeHtml(item.stage)}</td>
      <td><span class="badge ${statusClass(item.status)}">${readableStatus(item.status)}</span></td>
      <td>${renderRowActions(item)}</td>
    </tr>
  `;
}

function renderDocumentAction(item) {
  const module = state.module;
  const role = currentUser().role;

  if (module === "Hub" && role === "Super") {
    return `<button class="doc-button" data-dialog="assign" data-id="${item.id}">${escapeHtml(item.documentNo)}</button>`;
  }

  if (module === "MyBox" && role === "Operator") {
    return `<button class="doc-button" data-dialog="toInProcess" data-id="${item.id}">${escapeHtml(item.documentNo)}</button>`;
  }

  if (module === "MyBox" && role === "Super") {
    return `<button class="doc-button" data-dialog="approve" data-id="${item.id}">${escapeHtml(item.documentNo)}</button>`;
  }

  return `<button class="doc-button" data-dialog="view" data-id="${item.id}">${escapeHtml(item.documentNo)}</button>`;
}

function renderRowActions(item) {
  const role = currentUser().role;

  if (role === "Super" && isBranchModule(state.module)) {
    return `<div class="row-actions always"><button data-dialog="view" data-id="${item.id}">View Application</button><button data-dialog="history" data-id="${item.id}">View History</button></div>`;
  }

  if (state.module === "InProcess") {
    const finalAction =
      role === "Super"
        ? `<button data-dialog="approve" data-id="${item.id}">Approved Application</button>`
        : `<button data-dialog="preapprove" data-id="${item.id}">PreApproved Application</button>`;

    return `
      <div class="row-actions">
        <button data-dialog="requestCustomer" data-id="${item.id}">Request to Customer</button>
        <button data-dialog="cancel" data-id="${item.id}">Cancel Application</button>
        <button data-dialog="view" data-id="${item.id}">View Application</button>
        <button data-dialog="history" data-id="${item.id}">View History</button>
        ${finalAction}
      </div>
    `;
  }

  if (state.module === "Approved Card List") {
    return `<div class="row-actions"><button data-dialog="readyIssue" data-id="${item.id}">Ready to Issue</button><button data-dialog="view" data-id="${item.id}">View Application</button><button data-dialog="history" data-id="${item.id}">View History</button></div>`;
  }

  if (state.module === "Ready to Issue") {
    return `<div class="row-actions"><button data-dialog="completeCard" data-id="${item.id}">Completed Card List</button><button data-dialog="view" data-id="${item.id}">View Application</button><button data-dialog="history" data-id="${item.id}">View History</button></div>`;
  }

  return `<div class="row-actions always"><button data-dialog="view" data-id="${item.id}">View</button><button data-dialog="history" data-id="${item.id}">History</button></div>`;
}

function isBranchModule(module) {
  return branchModules.includes(module);
}

function renderDialog() {
  if (!state.dialog) return "";
  const item = applications.find((application) => application.id === state.dialog.id);
  if (!item) return "";

  const title = dialogTitle(state.dialog.type);
  return `
    <div class="modal-backdrop">
      <section class="modal">
        <div class="modal-header">
          <div>
            <h2>${escapeHtml(title)}</h2>
            <p>${escapeHtml(item.documentNo)} - ${escapeHtml(item.applicantName)}</p>
          </div>
          <button class="close-button" id="closeDialog">Close</button>
        </div>
        <div class="modal-body">
          ${dialogBody(item, state.dialog.type)}
        </div>
      </section>
    </div>
  `;
}

function dialogTitle(type) {
  const titles = {
    assign: "Assign Request",
    toInProcess: "Go To InProcess",
    requestCustomer: "Request to Customer",
    cancel: "Cancel Application",
    view: "View Application",
    history: "View History",
    preapprove: "PreApproved Application",
    approve: "Approved Application",
    readyIssue: "Move to Ready to Issue",
    completeCard: "Move to Completed Card List",
  };
  return titles[type] || "Application";
}

function dialogBody(item, type) {
  if (type === "view") return renderApplicationDetails(item);
  if (type === "history") return renderHistory(item);

  if (type === "assign") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Dedicated Operator</label>
        <select id="assignOperator">${operators().map((operator) => option(operator.id, operator.name, operators()[0].id)).join("")}</select>
        <label>Assignment Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="Assignment remark"></textarea>
        <button class="primary-button" data-action="assign">Submit</button>
      </div>
    `;
  }

  if (type === "toInProcess") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Operator Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="Remark before moving to InProcess"></textarea>
        <button class="primary-button" data-action="toInProcess">Go To InProcess</button>
      </div>
    `;
  }

  if (type === "requestCustomer") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Request Reason</label>
        <select id="requestReason">
          <option value="INSUFFICIENT">Balance or customer information insufficient</option>
          <option value="INCOMPLETE">Documents incomplete</option>
        </select>
        <label>Remark to Customer</label>
        <textarea id="dialogRemark" rows="3" placeholder="Customer request remark"></textarea>
        <p class="help-text">This action records SMS notification and SSBP customer portal MyOrder update.</p>
        <button class="primary-button" data-action="requestCustomer">Submit Request</button>
      </div>
    `;
  }

  if (type === "cancel") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Cancellation Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="KYC mismatch or other cancellation reason"></textarea>
        <p class="help-text">This action records SMS notification and SSBP customer portal MyOrder update.</p>
        <button class="danger-button" data-action="cancel">Cancel Application</button>
      </div>
    `;
  }

  if (type === "preapprove") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>PreApproved Comment</label>
        <textarea id="dialogRemark" rows="3" placeholder="Operator preapproved comment and predecided condition"></textarea>
        <button class="primary-button" data-action="preapprove">PreApprove and Submit to Super</button>
      </div>
    `;
  }

  if (type === "approve") {
    return `
      ${renderApplicationDetails(item)}
      <div class="notice">Operator PreApproved Comment: ${escapeHtml(item.preapprovedComment || "No preapproved comment recorded.")}</div>
      <div class="dialog-form">
        <label>Final Approved Amount</label>
        <input id="approvedAmount" type="number" value="${item.approvedAmount || item.creditLimitAmount}" />
        <label>Super Approval Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="Final approval remark"></textarea>
        <button class="primary-button" data-action="approve">Approved Application</button>
      </div>
    `;
  }

  if (type === "readyIssue") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Branch Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="Card ready for pickup remark"></textarea>
        <p class="help-text">This action records SMS notification that the card is ready to pick up at the selected branch.</p>
        <button class="primary-button" data-action="readyIssue">Move to Ready to Issue</button>
      </div>
    `;
  }

  if (type === "completeCard") {
    return `
      ${renderApplicationDetails(item)}
      <div class="dialog-form">
        <label>Collection Remark</label>
        <textarea id="dialogRemark" rows="3" placeholder="Customer pickup confirmation remark"></textarea>
        <p class="help-text">This action records SMS notification: Thank you for using our credit card service.</p>
        <button class="primary-button" data-action="completeCard">Move to Completed Card List</button>
      </div>
    `;
  }

  return renderApplicationDetails(item);
}

function renderApplicationDetails(item) {
  return `
    <div class="detail-grid">
      <div><label>Document No</label><strong>${escapeHtml(item.documentNo)}</strong></div>
      <div><label>Application Channel</label><strong>${escapeHtml(item.applicationChannel)}</strong></div>
      <div><label>Application Type</label><strong>${escapeHtml(item.applicationType)}</strong></div>
      <div><label>Applicant Name</label><strong>${escapeHtml(item.applicantName)}</strong></div>
      <div><label>NRC</label><strong>${escapeHtml(item.nrc)}</strong></div>
      <div><label>Credit Limit Amount</label><strong>${formatCurrency(item.creditLimitAmount)}</strong></div>
      <div><label>Approved Amount</label><strong>${formatApproved(item.approvedAmount)}</strong></div>
      <div><label>Applied Date</label><strong>${formatDate(item.appliedAt)}</strong></div>
      <div><label>Stage</label><strong>${escapeHtml(item.stage)}</strong></div>
      <div><label>Status</label><strong>${readableStatus(item.status)}</strong></div>
      <div><label>Assigned Operator</label><strong>${escapeHtml(userName(item.assignedOperatorId))}</strong></div>
      <div><label>Branch</label><strong>${escapeHtml(item.branchCode)}</strong></div>
    </div>
  `;
}

function renderHistory(item) {
  return `
    <div class="history-list">
      ${item.history
        .map(
          (history) => `
            <div class="history-item">
              <strong>${escapeHtml(history.status)} - ${escapeHtml(history.actor)}</strong>
              <span>${formatDate(history.at)}</span>
              <p>${escapeHtml(history.remark)}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function bindEvents() {
  document.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
      state.module = button.dataset.module;
      state.page = 1;
      state.formSubmitted = false;
      state.formErrors = [];
      clearToast();
      render();
    });
  });

  const userSelect = document.getElementById("userSelect");
  if (userSelect) {
    userSelect.addEventListener("change", (event) => {
      state.userId = event.target.value;
      state.page = 1;
      state.dialog = null;
      clearToast();
      render();
    });
  }

  [
    ["search", "search"],
    ["status", "status"],
    ["stage", "stage"],
    ["dateFrom", "dateFrom"],
    ["dateTo", "dateTo"],
  ].forEach(([id, key]) => {
    const control = document.getElementById(id);
    if (control) {
      const updateDraft = (event) => {
        state.filterDraft[key] = event.target.value;
      };
      control.addEventListener("input", updateDraft);
      control.addEventListener("change", updateDraft);
    }
  });

  const searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        applyFilters();
      }
    });
  }

  const applyFiltersButton = document.getElementById("applyFilters");
  if (applyFiltersButton) {
    applyFiltersButton.addEventListener("click", applyFilters);
  }

  bindBranchFormEvents();

  const prevPage = document.getElementById("prevPage");
  if (prevPage) {
    prevPage.addEventListener("click", () => {
      state.page = Math.max(1, state.page - 1);
      render();
    });
  }

  const nextPage = document.getElementById("nextPage");
  if (nextPage) {
    nextPage.addEventListener("click", () => {
      state.page += 1;
      render();
    });
  }

  document.querySelectorAll("[data-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      state.dialog = { type: button.dataset.dialog, id: button.dataset.id };
      clearToast();
      render();
    });
  });

  const closeDialog = document.getElementById("closeDialog");
  if (closeDialog) {
    closeDialog.addEventListener("click", () => {
      state.dialog = null;
      render();
    });
  }

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => performAction(button.dataset.action));
  });
}

function applyFilters() {
  state.search = state.filterDraft.search;
  state.status = state.filterDraft.status;
  state.stage = state.filterDraft.stage;
  state.dateFrom = state.filterDraft.dateFrom;
  state.dateTo = state.filterDraft.dateTo;
  state.page = 1;
  render();
}

function bindBranchFormEvents() {
  document.querySelectorAll("[data-branch-field]").forEach((control) => {
    const update = (event) => {
      const fieldName = event.target.dataset.branchField;
      if (event.target.type === "file") {
        state.branchForm[fieldName] = event.target.files?.[0]?.name || "";
      } else {
        state.branchForm[fieldName] = event.target.value;
      }
      state.formSubmitted = false;
      state.formErrors = [];

      if (fieldName === "cardBrand") {
        const allowedTypes = cardTypeOptions(state.branchForm.cardBrand);
        if (!allowedTypes.includes(state.branchForm.cardType)) {
          state.branchForm.cardType = allowedTypes[0];
        }
        render();
      }

      if (fieldName === "dob") {
        state.branchForm.age = calculateAge(state.branchForm.dob) || "";
        render();
      }
    };

    control.addEventListener("input", update);
    control.addEventListener("change", update);
  });

  document.querySelectorAll("[data-supp-field]").forEach((control) => {
    const update = (event) => {
      const index = Number(event.target.dataset.suppIndex);
      const fieldName = event.target.dataset.suppField;
      if (!state.branchForm.supplementaryCards[index]) return;

      if (event.target.type === "file") {
        state.branchForm.supplementaryCards[index][fieldName] = event.target.files?.[0]?.name || "";
      } else {
        state.branchForm.supplementaryCards[index][fieldName] = event.target.value;
      }
      state.formSubmitted = false;
      state.formErrors = [];
    };

    control.addEventListener("input", update);
    control.addEventListener("change", update);
  });

  const loadCoreCustomer = document.getElementById("loadCoreCustomer");
  if (loadCoreCustomer) {
    loadCoreCustomer.addEventListener("click", loadApplicantFromCore);
  }

  const addSupplementary = document.getElementById("addSupplementary");
  if (addSupplementary) {
    addSupplementary.addEventListener("click", () => {
      if (state.branchForm.supplementaryCards.length < 4) {
        state.branchForm.supplementaryCards.push(createSupplementaryCard());
        state.formSubmitted = false;
        state.formErrors = [];
        render();
      }
    });
  }

  document.querySelectorAll("[data-remove-supplementary]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.removeSupplementary);
      state.branchForm.supplementaryCards.splice(index, 1);
      state.formSubmitted = false;
      state.formErrors = [];
      render();
    });
  });

  const resetBranchApplication = document.getElementById("resetBranchApplication");
  if (resetBranchApplication) {
    resetBranchApplication.addEventListener("click", () => {
      state.branchForm = createBlankBranchForm();
      state.formErrors = [];
      state.formSubmitted = false;
      clearToast();
      render();
    });
  }

  const submitBranchApplication = document.getElementById("submitBranchApplication");
  if (submitBranchApplication) {
    submitBranchApplication.addEventListener("click", submitBranchApplicationForm);
  }
}

function loadApplicantFromCore() {
  const accountNumber = state.branchForm.autoDebitAccountNumber;
  const customer = coreCustomers[accountNumber];

  if (!/^\d{17}$/.test(accountNumber)) {
    state.formErrors = ["Auto Debit Account Number must be exactly 17 digits before core lookup."];
    state.formSubmitted = true;
    render();
    return;
  }

  if (!customer) {
    state.formErrors = ["No mock core customer found for this account number. Try 12345678901234567 or 98765432109876543."];
    state.formSubmitted = true;
    render();
    return;
  }

  state.branchForm.applicantName = customer.applicantName;
  state.branchForm.fatherName = customer.fatherName;
  state.branchForm.nrc = customer.nrc;
  state.branchForm.mobile = customer.mobile;
  state.branchForm.email = customer.email;
  state.formErrors = [];
  state.formSubmitted = false;
  showToast("Applicant information loaded from mock core banking profile.");
  render();
}

function submitBranchApplicationForm() {
  const errors = validateBranchApplication();
  state.formSubmitted = true;
  if (errors.length) {
    state.formErrors = errors;
    clearToast();
    render();
    return;
  }

  const form = state.branchForm;
  const now = new Date();
  const sequence = applications.length + 1;
  const documentNo = `BR-DOC-${now.getFullYear()}-${String(720000 + sequence)}`;

  applications.unshift({
    id: `BR-CC-${now.getFullYear()}-${String(sequence).padStart(4, "0")}`,
    documentNo,
    applicationChannel: "Branch",
    applicationType: "Branch Created New Application",
    applicantName: form.applicantName,
    nrc: form.nrc,
    creditLimitAmount: Number(form.creditLimitAmount),
    approvedAmount: null,
    appliedAt: now.toISOString(),
    stage: "Super",
    status: "NEW",
    assignedOperatorId: "",
    branchCode: currentUser().branchCode || form.collectionBranch,
    cardStage: "",
    preapprovedComment: "",
    branchApplication: {
      cardBrand: form.cardBrand,
      cardType: form.cardType,
      paymentType: form.paymentType,
      collectionBranch: form.collectionBranch,
      supplementaryCards: form.supplementaryCards.filter(hasAnySupplementaryValue),
    },
    history: [
      historyItem(
        "Branch",
        `Branch-created application submitted by ${currentUser().name}. Routed to Super Hub for assignment.`,
        "NEW",
      ),
    ],
  });

  state.branchForm = createBlankBranchForm();
  state.formErrors = [];
  state.formSubmitted = false;
  showToast(`${documentNo} submitted successfully. It is now available in Super Hub as NEW.`);
  render();
}

function validateBranchApplication() {
  const form = state.branchForm;
  const errors = [];
  const requiredFields = [
    ["cardBrand", "Card Brand"],
    ["cardType", "Card Type"],
    ["creditLimitAmount", "Credit Limit Amount"],
    ["autoDebitAccountNumber", "Auto Debit Account Number"],
    ["paymentType", "Payment Type"],
    ["collectionBranch", "Collection Branch"],
    ["salutation", "Salutation"],
    ["gender", "Gender"],
    ["applicantName", "Applicant Name from core"],
    ["fatherName", "Father's Name from core"],
    ["nrc", "NRC/Passport No. from core"],
    ["nationality", "Nationality"],
    ["dob", "Date of Birth"],
    ["occupation", "Occupation"],
    ["maritalStatus", "Marital Status"],
    ["dependents", "No. of Dependents"],
    ["familyMembersWorking", "Family Members Working"],
    ["educationLevel", "Education Level"],
    ["residentialStatus", "Residential Status"],
    ["addressNo", "Residential Address No"],
    ["addressStreet", "Residential Address Street"],
    ["addressWard", "Residential Address Ward"],
    ["addressStateDivision", "Residential Address State/Division"],
    ["addressDistrict", "Residential Address District"],
    ["addressTownship", "Residential Address Township"],
    ["addressTown", "Residential Address Town"],
    ["mobile", "Mobile No."],
    ["email", "Email"],
    ["companyName", "Company Name"],
    ["natureOfBusiness", "Nature of Business"],
    ["kbzPayAccountNo", "KBZPay Account No."],
    ["designation", "Designation"],
    ["department", "Department"],
    ["termOfEmployment", "Term of Employment"],
    ["salariedBankName", "Salaried Bank Name"],
    ["salariedBankAccountNo", "Salaried Bank Account No."],
    ["monthlyIncome", "Monthly Income"],
    ["lengthOfService", "Length of Service"],
    ["serviceYear", "Year"],
    ["serviceMonth", "Monthly"],
    ["officePhone", "Office Phone"],
    ["officeExt", "Ext"],
    ["officeAddress", "Office Address"],
    ["officeNo", "Office No"],
    ["officeStreet", "Office Street"],
    ["officeWard", "Office Ward"],
    ["officeTownship", "Office Township"],
    ["officeTown", "Office Town"],
    ["applicantDocNrcFront", "Applicant NRC Front"],
    ["applicantDocNrcBack", "Applicant NRC Back"],
    ["applicantDocHousehold", "Household Registration"],
    ["applicantDocElectricity", "Electricity Bill"],
    ["applicantDocIncomeProof", "Income Proof"],
  ];

  if (form.occupation === "Employee") {
    requiredFields.push(["applicantDocHrLetter", "HR Recommendation Letter"]);
  } else {
    requiredFields.push(["applicantDocBusinessLicense", "DICA / Business License"]);
  }

  requiredFields.forEach(([key, label]) => {
    if (!String(form[key] || "").trim()) errors.push(`${label} is mandatory.`);
  });

  if (form.nationality === "Other" && !form.nationalityOther.trim()) {
    errors.push("Other Nationality is mandatory when nationality is Other.");
  }

  if (!/^\d{17}$/.test(form.autoDebitAccountNumber)) {
    errors.push("Auto Debit Account Number must allow 17 digits and numerals only.");
  }

  const creditLimit = Number(form.creditLimitAmount);
  if (!Number.isFinite(creditLimit) || creditLimit <= 0) {
    errors.push("Credit Limit Amount must be numeric.");
  } else {
    if (creditLimit > 5000000) errors.push("The Maximum Credit Limit is 5,000,000 MMK.");
    if (form.cardType === "Platinum" && creditLimit < 2000000) errors.push("Platinum Credit Limit must be at least 2,000,000 MMK.");
    if (form.cardType === "Classic" && creditLimit < 200000) errors.push("Classic Credit Limit must be at least 200,000 MMK.");
  }

  const applicantAge = calculateAge(form.dob);
  if (!applicantAge || applicantAge < 21 || applicantAge > 65) {
    errors.push("Applicant age must be minimum 21 years old and maximum 65 years.");
  }

  if (!/^\d+$/.test(form.dependents)) errors.push("No. of Dependents must allow digits only.");
  if (!/^\d+$/.test(form.familyMembersWorking)) errors.push("No. of Family Members Working must allow digits only.");
  if (!/^\d+$/.test(form.mobile)) errors.push("Mobile No. must allow digits only.");
  if (!isEmail(form.email)) errors.push("Email must be valid.");

  if (hasAnyGuarantorValue(form)) {
    const guarantorAge = calculateAge(form.guarantorDob);
    if (form.guarantorDob && (!guarantorAge || guarantorAge < 21 || guarantorAge > 65)) {
      errors.push("Guarantor age must be minimum 21 years old and maximum 65 years.");
    }
    if (form.guarantorMobile && form.guarantorMobile === form.mobile) {
      errors.push("Guarantor Mobile Phone Number must not be the same as Applicant Mobile No.");
    }
    if (form.guarantorOfficePhone && form.guarantorOfficePhone === form.mobile) {
      errors.push("Guarantor Office Phone Number must not be the same as Applicant Mobile No.");
    }
  }

  form.supplementaryCards.forEach((card, index) => {
    if (!hasAnySupplementaryValue(card)) return;
    const label = `Supplementary Card ${index + 1}`;
    ["applicantName", "nrc", "relationship", "dob", "phone", "email", "gender", "docNrcCopy"].forEach((key) => {
      if (!String(card[key] || "").trim()) errors.push(`${label} ${readSupplementaryLabel(key)} is required when supplementary details are entered.`);
    });
    if (card.applicantName.length > 21) errors.push(`${label} Applicant Name must be 21 characters or fewer including spaces.`);
    const suppAge = calculateAge(card.dob);
    if (card.dob && (!suppAge || suppAge < 18 || suppAge > 65)) errors.push(`${label} age must be minimum 18 years old and maximum 65 years.`);
    if (card.phone && !/^\d+$/.test(card.phone)) errors.push(`${label} Phone Number must allow digits only.`);
    if (card.email && !isEmail(card.email)) errors.push(`${label} Email Address must be valid.`);
  });

  return errors;
}

function hasAnyGuarantorValue(form) {
  return [
    "guarantorName",
    "guarantorNrc",
    "guarantorFatherName",
    "guarantorDob",
    "guarantorNationality",
    "guarantorMobile",
    "guarantorEmail",
    "guarantorAddress",
    "guarantorCompanyName",
    "guarantorNatureOfBusiness",
    "guarantorMonthlyIncome",
    "guarantorIncomeAccount",
    "guarantorIncomeBankName",
    "guarantorDepartment",
    "guarantorDesignation",
    "guarantorLengthOfService",
    "guarantorOfficePhone",
    "guarantorOfficeAddress",
    "guarantorDocNrc",
    "guarantorDocHousehold",
    "guarantorDocElectricity",
    "guarantorDocIncomeProof",
  ].some((key) => String(form[key] || "").trim());
}

function hasAnySupplementaryValue(card) {
  return Object.entries(card).some(([key, value]) => key !== "gender" && String(value || "").trim());
}

function readSupplementaryLabel(key) {
  const labels = {
    applicantName: "Applicant Name",
    nrc: "NRC/Passport No.",
    relationship: "Relationship",
    dob: "Date of Birth",
    phone: "Phone Number",
    email: "Email Address",
    gender: "Gender",
    docNrcCopy: "NRC Copy",
  };
  return labels[key] || key;
}

function calculateAge(dateValue) {
  if (!dateValue) return "";
  const birthDate = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return "";
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age;
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function performAction(action) {
  const item = applications.find((application) => application.id === state.dialog?.id);
  if (!item) return;

  const actor = currentUser().role;
  const remark = document.getElementById("dialogRemark")?.value.trim() || "";

  if (action === "assign") {
    const operatorId = document.getElementById("assignOperator")?.value || operators()[0].id;
    item.assignedOperatorId = operatorId;
    moveStatus(item, "ASSIGNED", "Operator", actor, remark || `Assigned to ${userName(operatorId)}.`);
    showToast(`${item.documentNo} assigned to ${userName(operatorId)}.`);
  }

  if (action === "toInProcess") {
    moveStatus(item, "IN_PROCESS", "Operator", actor, remark || "Moved to InProcess.");
    showToast(`${item.documentNo} moved to InProcess.`);
  }

  if (action === "requestCustomer") {
    const nextStatus = document.getElementById("requestReason")?.value || "INSUFFICIENT";
    moveStatus(
      item,
      nextStatus,
      "Operator",
      actor,
      remark || "Requested customer update. SMS sent and SSBP MyOrder updated.",
    );
    showToast(`${item.documentNo} customer request recorded with SMS and SSBP MyOrder update.`);
  }

  if (action === "cancel") {
    moveStatus(item, "CANCELLED", "Operator", actor, remark || "Cancelled due to KYC mismatch. SMS sent and SSBP MyOrder updated.");
    showToast(`${item.documentNo} cancelled with customer notification.`);
  }

  if (action === "preapprove") {
    item.preapprovedComment = remark || "Operator PreApproved the request.";
    moveStatus(item, "PENDING_APPROVAL", "Super", actor, item.preapprovedComment);
    showToast(`${item.documentNo} submitted to Super MyBox as PreApproved.`);
  }

  if (action === "approve") {
    const amount = Number(document.getElementById("approvedAmount")?.value || item.creditLimitAmount);
    item.approvedAmount = amount;
    item.cardStage = "APPROVED_CARD_LIST";
    moveStatus(item, "APPROVED_READY_TO_ISSUE", "Branch", actor, remark || `Final approved for ${formatCurrency(amount)}.`);
    showToast(`${item.documentNo} final approved and moved to Approved Card List.`);
  }

  if (action === "readyIssue") {
    item.cardStage = "READY_TO_ISSUE";
    addHistory(item, actor, remark || "Moved to Ready to Issue. SMS sent for branch pickup.");
    showToast(`${item.documentNo} moved to Ready to Issue and pickup SMS recorded.`);
  }

  if (action === "completeCard") {
    item.cardStage = "COMPLETED_CARD_LIST";
    moveStatus(item, "COMPLETE", "Branch", actor, remark || "Customer picked up card. Thank-you SMS sent.");
    showToast(`${item.documentNo} moved to Completed Card List.`);
  }

  state.dialog = null;
  state.page = 1;
  render();
}

function moveStatus(item, status, stage, actor, remark) {
  item.status = status;
  item.stage = stage;
  addHistory(item, actor, remark, status);
}

function addHistory(item, actor, remark, status = item.status) {
  item.history.unshift({
    actor,
    remark,
    status,
    at: new Date().toISOString(),
  });
}

function showToast(message) {
  state.toast = message;
}

function clearToast() {
  state.toast = "";
}

function option(value, label, selected) {
  return `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(label)}</option>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

render();
