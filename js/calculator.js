'use strict';
document.addEventListener("DOMContentLoaded", () => {
    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate)
        const end = endDate === "present" ? new Date() : new Date(endDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        const years = Math.floor(diffDays / 365)
        const months = Math.floor((diffDays % 365) / 30)

        let duration = ""
        if (years > 0) {
            duration += `${years} yr${years > 1 ? "s" : ""}`
        }
        if (months > 0) {
            if (duration) duration += ", "
            duration += `${months} mo${months > 1 ? "s" : ""}`
        }
        return duration
    }

    function updateDurations() {
        const timelineItems = document.querySelectorAll(".timeline-item span[data-start-date]")
        timelineItems.forEach((item) => {
            const startDate = item.getAttribute("data-start-date")
            const endDate = item.getAttribute("data-end-date")
            const durationElement = item.querySelector(".duration")

            if (durationElement) {
                const duration = calculateDuration(startDate, endDate)
                durationElement.textContent = duration
            } else if (endDate === "present") {
                const duration = calculateDuration(startDate, "present")
                item.textContent = `${item.textContent.split("—")[0]}— Present • ${duration}`
            }
        })
    }

    // Initial update
    updateDurations()

    // Update durations every minute
    setInterval(updateDurations, 60000)
})
