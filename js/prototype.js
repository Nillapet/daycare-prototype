
/* =====================================================
   DAYCARE MANAGEMENT SYSTEM - PROTOTYPE INTERACTIONS
   ===================================================== */


/* LOGIN MANAGEMENT */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;
        const message = document.getElementById("loginMessage");

        message.textContent = "";

        if (!fullName || !email || !password || !role) {
            message.textContent = "Please complete all the fields.";
            return;
        }

        const user = {
            fullName: fullName,
            email: email,
            role: role
        };

        // Store demonstration details temporarily in the browser.
        sessionStorage.setItem("daycareUser", JSON.stringify(user));

        // Direct the user to the appropriate dashboard.
        if (role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else if (role === "staff") {
            window.location.href = "staff-dashboard.html";
        } else if (role === "parent") {
            window.location.href = "parent-dashboard.html";
        }

    });

}


/* ADMINISTRATOR DASHBOARD */

const savedUser = sessionStorage.getItem("daycareUser");

const adminName = document.getElementById("adminName");
const currentDate = document.getElementById("currentDate");

if (adminName && savedUser) {

    const user = JSON.parse(savedUser);

    if (user.role === "admin") {
        adminName.textContent = user.fullName;
    }

}

if (currentDate) {

    currentDate.textContent = new Date().toLocaleDateString(
        "en-KE",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}


/* ATTENDANCE MANAGEMENT */

const attendanceForm = document.getElementById("attendanceForm");

if (attendanceForm) {

    const attendanceStatuses = document.querySelectorAll(".attendance-status");
    const attendanceMessage = document.getElementById("attendanceMessage");

    function updateAttendanceCounts() {

        let present = 0;
        let absent = 0;
        let late = 0;

        attendanceStatuses.forEach(function(select) {

            if (select.value === "Present") present++;
            if (select.value === "Absent") absent++;
            if (select.value === "Late") late++;

        });

        document.getElementById("presentCount").textContent = present;
        document.getElementById("absentCount").textContent = absent;
        document.getElementById("lateCount").textContent = late;

    }

    attendanceStatuses.forEach(function(select) {

        select.addEventListener("change", updateAttendanceCounts);

    });

    attendanceForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const records = [];

        attendanceStatuses.forEach(function(select) {

            records.push({
                childId: select.name,
                status: select.value
            });

        });

        sessionStorage.setItem(
            "attendanceRecords",
            JSON.stringify(records)
        );

        attendanceMessage.textContent =
            "Attendance records have been saved successfully.";

        attendanceMessage.style.color = "#25845D";

        updateAttendanceCounts();

    });

    const today = new Date();

    document.getElementById("attendanceDate").textContent =
        today.toLocaleDateString("en-KE", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

}


/* CHILD REGISTRATION MANAGEMENT */

const childForm = document.getElementById("childForm");

if (childForm) {

    const childrenTableBody = document.getElementById("childrenTableBody");
    const childMessage = document.getElementById("childMessage");
    const totalChildren = document.getElementById("totalChildren");

    let children = [
        {
            id: "CH001",
            name: "Amara Wanjiku",
            age: 3,
            childClass: "Toddlers",
            parent: "Mary Wanjiku",
            phone: "0712345678"
        },
        {
            id: "CH002",
            name: "Brian Otieno",
            age: 5,
            childClass: "Pre-Primary",
            parent: "Peter Otieno",
            phone: "0723456789"
        },
        {
            id: "CH003",
            name: "Faith Akinyi",
            age: 2,
            childClass: "Baby Class",
            parent: "Jane Akinyi",
            phone: "0734567890"
        },
        {
            id: "CH004",
            name: "Daniel Mwangi",
            age: 3,
            childClass: "Toddlers",
            parent: "Grace Mwangi",
            phone: "0745678901"
        }
    ];

    function displayChildren() {

        childrenTableBody.innerHTML = "";

        children.forEach(function(child) {

            const row = document.createElement("tr");

            [
                child.id,
                child.name,
                child.age,
                child.childClass,
                child.parent,
                child.phone
            ].forEach(function(value) {

                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);

            });

            childrenTableBody.appendChild(row);

        });

        totalChildren.textContent = 48 + (children.length - 4);

    }

    childForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const child = {

            id: "CH" + String(children.length + 1).padStart(3, "0"),

            name: document.getElementById("childName").value.trim(),

            age: document.getElementById("childAge").value,

            childClass: document.getElementById("childClass").value,

            parent: document.getElementById("parentName").value.trim(),

            phone: document.getElementById("parentPhone").value.trim(),

            registrationDate: document.getElementById("registrationDate").value

        };

        children.push(child);

        sessionStorage.setItem(
            "registeredChildren",
            JSON.stringify(children)
        );

        displayChildren();

        childForm.reset();

        childMessage.textContent =
            "Child registered successfully. The new record has been added to the table.";

        childMessage.style.color = "#25845D";

    });

    displayChildren();

}


/* STAFF REGISTRATION MANAGEMENT */

const staffForm = document.getElementById("staffForm");

if (staffForm) {

    const staffTableBody = document.getElementById("staffTableBody");
    const staffMessage = document.getElementById("staffMessage");
    const totalStaff = document.getElementById("totalStaff");

    let staffMembers = [
        {
            id: "ST001",
            name: "Grace Atieno",
            email: "grace@example.com",
            phone: "0712345678",
            role: "Teacher"
        },
        {
            id: "ST002",
            name: "Peter Kamau",
            email: "peter@example.com",
            phone: "0723456789",
            role: "Administrator"
        },
        {
            id: "ST003",
            name: "Lucy Njeri",
            email: "lucy@example.com",
            phone: "0734567890",
            role: "Caregiver"
        },
        {
            id: "ST004",
            name: "James Otieno",
            email: "james@example.com",
            phone: "0745678901",
            role: "Support Staff"
        }
    ];

    function displayStaff() {

        staffTableBody.innerHTML = "";

        staffMembers.forEach(function(member) {

            const row = document.createElement("tr");

            [
                member.id,
                member.name,
                member.email,
                member.phone,
                member.role
            ].forEach(function(value) {

                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);

            });

            staffTableBody.appendChild(row);

        });

        totalStaff.textContent = 8 + (staffMembers.length - 4);

    }

    staffForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const member = {

            id: "ST" + String(staffMembers.length + 1).padStart(3, "0"),

            name: document.getElementById("staffFullName").value.trim(),

            email: document.getElementById("staffEmail").value.trim(),

            phone: document.getElementById("staffPhone").value.trim(),

            role: document.getElementById("staffRole").value,

            employmentDate: document.getElementById("staffDate").value

        };

        staffMembers.push(member);

        sessionStorage.setItem(
            "registeredStaff",
            JSON.stringify(staffMembers)
        );

        displayStaff();

        staffForm.reset();

        staffMessage.textContent =
            "Staff member registered successfully.";

        staffMessage.style.color = "#25845D";

    });

    displayStaff();

}


/* FEES AND PAYMENTS MANAGEMENT */

const paymentForm = document.getElementById("paymentForm");

if (paymentForm) {

    const paymentsTableBody = document.getElementById("paymentsTableBody");
    const paymentMessage = document.getElementById("paymentMessage");
    const outstandingBalance = document.getElementById("outstandingBalance");

    let payments = [
        {
            id: "PAY001",
            child: "Amara Wanjiku",
            amount: 8500,
            date: "03 Nov 2026",
            method: "M-Pesa",
            reference: "QWE1234567"
        },
        {
            id: "PAY002",
            child: "Brian Otieno",
            amount: 12000,
            date: "04 Nov 2026",
            method: "Bank Transfer",
            reference: "BNK45678"
        },
        {
            id: "PAY003",
            child: "Faith Akinyi",
            amount: 6000,
            date: "06 Nov 2026",
            method: "Cash",
            reference: "CASH003"
        }
    ];

    function displayPayments() {

        paymentsTableBody.innerHTML = "";

        payments.forEach(function(payment) {

            const row = document.createElement("tr");

            const values = [
                payment.id,
                payment.child,
                Number(payment.amount).toLocaleString("en-KE"),
                payment.date,
                payment.method,
                payment.reference
            ];

            values.forEach(function(value) {

                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);

            });

            const statusCell = document.createElement("td");

            statusCell.innerHTML =
                '<span class="status-badge success">Recorded</span>';

            row.appendChild(statusCell);

            paymentsTableBody.appendChild(row);

        });

    }

    paymentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const amount = Number(
            document.getElementById("paymentAmount").value
        );

        const method = document.getElementById("paymentMethod").value;

        const reference = document.getElementById("transactionReference").value.trim();

        if (amount <= 0 || !Number.isFinite(amount)) {

            paymentMessage.textContent =
                "Please enter a valid payment amount.";

            paymentMessage.style.color = "#C44455";

            return;

        }

        if (method === "M-Pesa" && !reference) {

            paymentMessage.textContent =
                "Please enter the M-Pesa transaction reference.";

            paymentMessage.style.color = "#C44455";

            return;

        }

        const dateValue = document.getElementById("paymentDate").value;

        const formattedDate = new Date(dateValue + "T00:00:00")
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        const payment = {

            id: "PAY" + String(payments.length + 1).padStart(3, "0"),

            child: document.getElementById("paymentChild").value,

            amount: amount,

            date: formattedDate,

            method: method,

            reference: reference || "Not provided"

        };

        payments.push(payment);

        sessionStorage.setItem(
            "paymentRecords",
            JSON.stringify(payments)
        );

        displayPayments();

        const newBalance = Math.max(
            0,
            18500 - payments.slice(3).reduce(function(total, item) {
                return total + item.amount;
            }, 0)
        );

        outstandingBalance.textContent =
            "KSh " + newBalance.toLocaleString("en-KE");

        paymentForm.reset();

        paymentMessage.textContent =
            "Payment recorded successfully. The payment record has been added.";

        paymentMessage.style.color = "#25845D";

    });

    displayPayments();

}


/* NOTICES AND PARENT COMMUNICATION */

const noticeForm = document.getElementById("noticeForm");

if (noticeForm) {

    const noticesList = document.getElementById("noticesList");
    const noticeMessage = document.getElementById("noticeMessage");
    const noticeCount = document.getElementById("noticeCount");

    const currentUser = JSON.parse(
        sessionStorage.getItem("daycareUser") || "null"
    );

    const currentRole = currentUser ? currentUser.role : "";
    const currentName = currentUser ? currentUser.fullName : "";

    // Demonstration parent and class information.
    const demoParentClasses = {
        "Mary Wanjiku": "Toddlers",
        "Peter Otieno": "Pre-Primary",
        "Jane Akinyi": "Baby Class",
        "Grace Mwangi": "Toddlers"
    };

    const parentClass = demoParentClasses[currentName] || "";

    // Sample notices displayed when the page is first opened.
    const sampleNotices = [
        {
            id: "sample1",
            title: "Parents' Meeting",
            category: "Parents' Meeting",
            audience: "All Parents",
            parentName: "",
            date: "10 Nov 2026",
            dateValue: "2026-11-10",
            content: "Parents are invited to attend a meeting at the daycare centre on 20 November at 10:00 AM.",
            createdBy: "Administrator",
            creatorRole: "admin"
        },
        {
            id: "sample2",
            title: "November Fee Reminder",
            category: "Fee Reminder",
            audience: "All Parents",
            parentName: "",
            date: "08 Nov 2026",
            dateValue: "2026-11-08",
            content: "Please remember to clear any outstanding daycare fees before the end of November.",
            createdBy: "Administrator",
            creatorRole: "admin"
        },
        {
            id: "sample3",
            title: "Children's Activity Day",
            category: "School Activity",
            audience: "Toddlers Parents",
            parentName: "",
            date: "05 Nov 2026",
            dateValue: "2026-11-05",
            content: "Our children's activity day will take place on 25 November. More details will be shared soon.",
            createdBy: "Administrator",
            creatorRole: "admin"
        }
    ];

    // Load saved notices or use the sample notices.
    let notices;

    const savedNotices = sessionStorage.getItem("publishedNotices");

    if (savedNotices) {

        notices = JSON.parse(savedNotices);

    } else {

        notices = sampleNotices;

        sessionStorage.setItem(
            "publishedNotices",
            JSON.stringify(notices)
        );

    }

    let editingNoticeId = null;

    const noticeAudience = document.getElementById("noticeAudience");
    const noticeParent = document.getElementById("noticeParent");

    // Show the individual parent selector only when needed.
    function updateParentSelector() {

        if (!noticeParent) {
            return;
        }

        const parentGroup = noticeParent.closest(".form-group");

        if (parentGroup) {

            parentGroup.style.display =
                noticeAudience.value === "Individual Parent"
                    ? "block"
                    : "none";

        }

    }

    if (noticeAudience) {

        noticeAudience.addEventListener(
            "change",
            updateParentSelector
        );

        updateParentSelector();

    }

    // Determine which notices a parent is allowed to see.
    function getVisibleNotices() {

        if (currentRole !== "parent") {
            return notices;
        }

        return notices.filter(function(notice) {

            if (notice.audience === "All Parents") {
                return true;
            }

            if (
                notice.audience === parentClass + " Parents" &&
                parentClass !== ""
            ) {
                return true;
            }

            if (
                notice.audience === "Individual Parent" &&
                notice.parentName === currentName
            ) {
                return true;
            }

            return false;

        });

    }

    // Create and display notice cards.
    function displayNotices() {

        noticesList.innerHTML = "";

        const visibleNotices = getVisibleNotices();

        visibleNotices.forEach(function(notice) {

            const card = document.createElement("div");
            card.className = "action-card";

            const title = document.createElement("h3");
            title.textContent = notice.title;

            const category = document.createElement("p");
            category.textContent =
                "Category: " + notice.category;

            const audience = document.createElement("p");

            let recipientText = notice.audience;

            if (
                notice.audience === "Individual Parent" &&
                notice.parentName
            ) {
                recipientText += " - " + notice.parentName;
            }

            audience.textContent =
                "Recipients: " + recipientText;

            const date = document.createElement("p");
            date.textContent = "Date: " + notice.date;

            const content = document.createElement("p");
            content.textContent = notice.content;

            const author = document.createElement("p");
            author.textContent =
                "Posted by: " + (notice.createdBy || "Administrator");

            const status = document.createElement("span");
            status.className = "status-badge success";
            status.textContent = "Published";

            card.appendChild(title);
            card.appendChild(category);
            card.appendChild(audience);
            card.appendChild(date);
            card.appendChild(content);
            card.appendChild(author);
            card.appendChild(status);

            // Administrators can manage all notices.
            // Staff can manage only notices they created.
            const canManage =
                currentRole === "admin" ||
                (
                    currentRole === "staff" &&
                    notice.creatorRole === "staff" &&
                    notice.createdBy === currentName
                );

            if (canManage) {

                const actions = document.createElement("div");
                actions.className = "form-actions";

                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.className = "secondary-button";
                editButton.textContent = "Edit";
                editButton.dataset.action = "edit";
                editButton.dataset.id = notice.id;

                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.className = "secondary-button";
                deleteButton.textContent = "Delete";
                deleteButton.dataset.action = "delete";
                deleteButton.dataset.id = notice.id;

                actions.appendChild(editButton);
                actions.appendChild(deleteButton);

                card.appendChild(actions);

            }

            noticesList.appendChild(card);

        });

        if (noticeCount) {
            noticeCount.textContent = visibleNotices.length;
        }

    }

    // Save notices in the current browser session.
    function saveNotices() {

        sessionStorage.setItem(
            "publishedNotices",
            JSON.stringify(notices)
        );

        displayNotices();

    }

    // Publish a new notice or update an existing notice.
    noticeForm.addEventListener("submit", function(event) {

        event.preventDefault();

        if (currentRole !== "admin" && currentRole !== "staff") {

            noticeMessage.textContent =
                "You do not have permission to publish notices.";

            noticeMessage.style.color = "#C44455";

            return;

        }

        const title = document.getElementById("noticeTitle").value.trim();
        const category = document.getElementById("noticeCategory").value;
        const audience = document.getElementById("noticeAudience").value;
        const dateValue = document.getElementById("noticeDate").value;
        const content = document.getElementById("noticeContent").value.trim();

        const parentName = noticeParent
            ? noticeParent.value
            : "";

        if (
            !title ||
            !category ||
            !audience ||
            !dateValue ||
            !content
        ) {

            noticeMessage.textContent =
                "Please complete all the required fields.";

            noticeMessage.style.color = "#C44455";

            return;

        }

        if (
            audience === "Individual Parent" &&
            !parentName
        ) {

            noticeMessage.textContent =
                "Please select the parent who should receive this notice.";

            noticeMessage.style.color = "#C44455";

            return;

        }

        const formattedDate = new Date(dateValue + "T00:00:00")
            .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        if (editingNoticeId) {

            const noticeIndex = notices.findIndex(function(notice) {
                return notice.id === editingNoticeId;
            });

            if (noticeIndex === -1) {

                noticeMessage.textContent =
                    "The selected notice could not be found.";

                noticeMessage.style.color = "#C44455";

                return;

            }

            const existingNotice = notices[noticeIndex];

            const canEdit =
                currentRole === "admin" ||
                (
                    currentRole === "staff" &&
                    existingNotice.creatorRole === "staff" &&
                    existingNotice.createdBy === currentName
                );

            if (!canEdit) {

                noticeMessage.textContent =
                    "You can only edit notices you created.";

                noticeMessage.style.color = "#C44455";

                return;

            }

            notices[noticeIndex] = {

                ...existingNotice,

                title: title,

                category: category,

                audience: audience,

                parentName: audience === "Individual Parent"
                    ? parentName
                    : "",

                date: formattedDate,

                dateValue: dateValue,

                content: content

            };

            noticeMessage.textContent =
                "Notice updated successfully.";

        } else {

            const notice = {

                id: "notice-" + Date.now(),

                title: title,

                category: category,

                audience: audience,

                parentName: audience === "Individual Parent"
                    ? parentName
                    : "",

                date: formattedDate,

                dateValue: dateValue,

                content: content,

                createdBy: currentName,

                creatorRole: currentRole

            };

            notices.unshift(notice);

            noticeMessage.textContent =
                "Notice published successfully. It has been added to the communication history.";

        }

        saveNotices();

        noticeForm.reset();

        editingNoticeId = null;

        updateParentSelector();

        const submitButton = noticeForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.textContent = "Publish Notice";
        }

        noticeMessage.style.color = "#25845D";

    });

    // Handle editing and deleting notices.
    noticesList.addEventListener("click", function(event) {

        const button = event.target.closest("button[data-action]");

        if (!button) {
            return;
        }

        const noticeId = button.dataset.id;

        const notice = notices.find(function(item) {
            return item.id === noticeId;
        });

        if (!notice) {
            return;
        }

        const canManage =
            currentRole === "admin" ||
            (
                currentRole === "staff" &&
                notice.creatorRole === "staff" &&
                notice.createdBy === currentName
            );

        if (!canManage) {

            noticeMessage.textContent =
                "You do not have permission to manage this notice.";

            noticeMessage.style.color = "#C44455";

            return;

        }

        // Delete a notice.
        if (button.dataset.action === "delete") {

            const confirmed = window.confirm(
                "Are you sure you want to delete this notice?"
            );

            if (!confirmed) {
                return;
            }

            notices = notices.filter(function(item) {
                return item.id !== noticeId;
            });

            if (editingNoticeId === noticeId) {

                editingNoticeId = null;

                noticeForm.reset();

                const submitButton = noticeForm.querySelector(
                    'button[type="submit"]'
                );

                if (submitButton) {
                    submitButton.textContent = "Publish Notice";
                }

                updateParentSelector();

            }

            saveNotices();

            noticeMessage.textContent =
                "Notice deleted successfully.";

            noticeMessage.style.color = "#25845D";

        }

        // Load a notice into the form for editing.
        if (button.dataset.action === "edit") {

            editingNoticeId = notice.id;

            document.getElementById("noticeTitle").value =
                notice.title;

            document.getElementById("noticeCategory").value =
                notice.category;

            document.getElementById("noticeAudience").value =
                notice.audience;

            document.getElementById("noticeDate").value =
                notice.dateValue || "";

            document.getElementById("noticeContent").value =
                notice.content;

            if (noticeParent) {
                noticeParent.value = notice.parentName || "";
            }

            updateParentSelector();

            const submitButton = noticeForm.querySelector(
                'button[type="submit"]'
            );

            if (submitButton) {
                submitButton.textContent = "Save Changes";
            }

            noticeMessage.textContent =
                "You are editing this notice. Make your changes and select Save Changes.";

            noticeMessage.style.color = "#7651A8";

            noticeForm.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

    // Display notices when the page loads.
    displayNotices();

}


/* REPORT GENERATION AND DOWNLOAD */

const reportForm = document.getElementById("reportForm");

if (reportForm) {

    const reportType = document.getElementById("reportType");
    const reportMonth = document.getElementById("reportMonth");
    const reportTitle = document.getElementById("reportTitle");
    const reportDescription = document.getElementById("reportDescription");
    const reportResults = document.getElementById("reportResults");
    const reportMessage = document.getElementById("reportMessage");
    const downloadReport = document.getElementById("downloadReport");

    let generatedReport = [];

    reportForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const type = reportType.value;
        const month = reportMonth.value;

        if (!type || !month) {

            reportMessage.textContent =
                "Please select a report type and month.";

            reportMessage.style.color = "#C44455";

            return;

        }

        if (type === "attendance") {

            reportTitle.textContent = month + " Attendance Report";

            reportDescription.textContent =
                "Summary of children's attendance records for " + month + ".";

            generatedReport = [
                ["Attendance Category", "Number of Children"],
                ["Total Registered Children", "48"],
                ["Present", "42"],
                ["Absent", "4"],
                ["Late", "2"],
                ["Attendance Rate", "87.5%"]
            ];

        } else {

            reportTitle.textContent = month + " Payment Report";

            reportDescription.textContent =
                "Summary of daycare fee payments for " + month + ".";

            generatedReport = [
                ["Payment Category", "Amount"],
                ["Total Fees Expected", "KSh 576,000"],
                ["Payments Received", "KSh 557,500"],
                ["Outstanding Balance", "KSh 18,500"]
            ];

        }

        let tableHTML = `
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>${generatedReport[0][0]}</th>
                            <th>${generatedReport[0][1]}</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        for (let i = 1; i < generatedReport.length; i++) {

            tableHTML += `
                <tr>
                    <td>${generatedReport[i][0]}</td>
                    <td>${generatedReport[i][1]}</td>
                </tr>
            `;

        }

        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

        reportResults.innerHTML = tableHTML;

        reportMessage.textContent =
            "Your " + type + " report has been generated successfully.";

        reportMessage.style.color = "#25845D";

    });

    downloadReport.addEventListener("click", function() {

        if (generatedReport.length === 0) {

            reportMessage.textContent =
                "Please generate a report before downloading.";

            reportMessage.style.color = "#C44455";

            return;

        }

        const csvContent = generatedReport
            .map(row => row.map(value => '"' + value + '"').join(","))
            .join("\n");

        const file = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;"
        });

        const link = document.createElement("a");
        const url = URL.createObjectURL(file);

        link.href = url;

        link.download =
            reportType.value + "-report-" + reportMonth.value + ".csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        reportMessage.textContent =
            "Your report has been downloaded successfully.";

        reportMessage.style.color = "#25845D";

    });

}


/* STAFF DASHBOARD PERSONALIZATION */

const staffName = document.getElementById("staffName");
const staffWelcome = document.getElementById("staffWelcome");

if (staffName && savedUser) {

    const user = JSON.parse(savedUser);

    if (user.role === "staff") {

        staffName.textContent = user.fullName;

        staffWelcome.textContent = user.fullName;

    }

}
