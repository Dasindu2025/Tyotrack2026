from datetime import datetime, time, timedelta

def split_time_entry(start_time: datetime, end_time: datetime):
    """
    Splits a time entry if it crosses midnight.
    Returns a list of (start, end) tuples.
    """
    if start_time.date() == end_time.date():
        return [(start_time, end_time)]
    
    splits = []
    current_start = start_time
    
    while current_start.date() < end_time.date():
        # End of the current day
        day_end = datetime.combine(current_start.date(), time(23, 59, 59, 999999))
        splits.append((current_start, day_end))
        
        # Start of the next day
        current_start = datetime.combine(current_start.date() + timedelta(days=1), time(0, 0, 0))
    
    # Final piece
    if current_start < end_time:
        splits.append((current_start, end_time))
        
    return splits

def calculate_duration(start: datetime, end: datetime) -> int:
    delta = end - start
    return int(delta.total_seconds() / 60)
