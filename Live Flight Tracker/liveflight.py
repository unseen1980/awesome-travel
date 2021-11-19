import requests, json, sqlite3
from datetime import datetime

def open_text_file():
    with open("ICAO_Airlines.txt", "r") as airlines:
        open_text_file.airline_list = (airlines.read()).split(", ")
        airlines.close()

def get_flight_info(airlines):
    url = "https://flight-data4.p.rapidapi.com/get_flight_info"
    querystring = {"flight":f"{airlines}"}
    headers = {
        'x-rapidapi-host': "flight-data4.p.rapidapi.com",
        'x-rapidapi-key': "API KEY HERE"
        }
    response = requests.request("GET", url, headers=headers, params=querystring)
    flight_info = response.json()
    departure_scheduled = flight_info[airlines]["flight"]["dep_scheduled"]
    departure_actualy = flight_info[airlines]["flight"]["dep_actual"]
    arr_scheduled = flight_info[airlines]["flight"]["arr_scheduled"]
    arr_estimated = flight_info[airlines]["flight"]["arr_estimated"]
    return departure_scheduled, departure_actualy, arr_scheduled, arr_estimated

def get_live_airlines(airlines):
    con =sqlite3.connect("flight_info.db")
    flight_db = con.cursor()
    live_flight_info = {}
    todays_date =  (datetime.today().strftime('%m/%d/%Y'))
    flight_db.execute("CREATE TABLE IF NOT EXISTS flights (Recorded_Date TEXT, Airline TEXT, Flight_number TEXT, Departure_location TEXT, Estimated_Departure TEXT, Scheduled_Departure TEXT, Arrival_location TEXT, Scheduled_Arrival TEXT, Estimated_Arrival TEXT);")
    for airlines in airlines:
        print(airlines)
        url = "https://flight-data4.p.rapidapi.com/get_airline_flights"
        querystring = {"airline":f"{airlines}"}
        headers = {
            'x-rapidapi-host': "flight-data4.p.rapidapi.com",
            'x-rapidapi-key': "API KEY HERE"
            }
        response = requests.request("GET", url, headers=headers, params=querystring)
        live_flights = response.json()
        for flight_info in live_flights:
                time_info = get_flight_info(flight_info["flight"])
                print(flight_info["flight"])
                flight_db.execute("INSERT INTO flights VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?); ", (todays_date, airlines, flight_info["flight"], flight_info["departure"], time_info[0], time_info[1], flight_info["arrival"], time_info[2], time_info[3] ))
    con.commit()

