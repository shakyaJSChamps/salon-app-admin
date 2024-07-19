export function addDurationToStartTime(startTimeStr, durationMinutes) {
    // Parse startTimeStr into hours and minutes
    let [hoursStr, minutesStr, period] = startTimeStr.split(/[:\s]/);
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    // Adjust hours based on period (AM/PM)
    if (period === 'PM' && hours !== 12) {
        hours += 12;
    } else if (period === 'AM' && hours === 12) {
        hours = 0;
    }

    // Create a Date object with the startTime
    let startTime = new Date();
    startTime.setHours(hours);
    startTime.setMinutes(minutes);

    // Add duration in minutes
    startTime.setMinutes(startTime.getMinutes() + durationMinutes);

    // Format end time to string
    let endTimeStr = startTime.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    return endTimeStr;
}