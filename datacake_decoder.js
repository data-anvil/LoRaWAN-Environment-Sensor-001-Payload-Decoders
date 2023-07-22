//example payload - 323131303335303331353434313338353432393533303130323130353938303232343230333935373039303233323035

function Decoder(payload, port) {
    // Initialize the data object
    var data = {};
  
    // Parse the latitude sign
    data.Latitude_Sign = parseInt(payload[0]-48)

    // Parse the longitude sign
    data.Longitude_Sign = parseInt(payload[1]-48)

    // Parse the temperature sign
    data.Temperature_Sign = parseInt(payload[2]-48);

    // Parse the longitude
    data.LAT = (
        100*(payload[3]-48) + 
        10*(payload[4]-48) + 
        1*(payload[5]-48) + 
        0.1*(payload[6]-48) + 
        0.01*(payload[7]-48) +
        0.001*(payload[8]-48) +
        0.0001*(payload[9]-48) +
        0.00001*(payload[10]-48) +
        0.000001*(payload[11]-48)
        );

    // Parse the latitude
    data.LONG = (
        100*(payload[12]-48) + 
        10*(payload[13]-48) + 
        1*(payload[14]-48) + 
        0.1*(payload[15]-48) + 
        0.01*(payload[16]-48) +
        0.001*(payload[17]-48) +
        0.0001*(payload[18]-48) +
        0.00001*(payload[19]-48) +
        0.000001*(payload[20]-48)
    );

    // Parse height above sea level in metres
    data.SEA = (
        1000*(payload[21]-48) + 
        100*(payload[22]-48) + 
        10*(payload[23]-48) + 
        1*(payload[24]-48) + 
        0.1*(payload[25]-48)
        );

    // Parse the environmental CO2 level in ppm
    data.CO2 = (
        1000*(payload[26]-48) + 
        100*(payload[27]-48) + 
        10*(payload[28]-48) + 
        1*(payload[29]-48) 
        );

    // Parse the temperature in degrees celsius
    data.TEMP = (
        100*(payload[30]-48) + 
        10*(payload[31]-48) + 
        1*(payload[32]-48) + 
        0.1*(payload[33]-48) + 
        0.01*(payload[34]-48)
        );

    // Parse the humidity in %
    data.RH = (
        100*(payload[35]-48) + 
        10*(payload[36]-48) + 
        1*(payload[37]-48) + 
        0.1*(payload[38]-48) + 
        0.01*(payload[39]-48)
    );

    // Parse UTC Time Hours:Minutes:Seconds
    data.TIME = (
        100000*(payload[40]-48) + 
        10000*(payload[41]-48) + 
        1000*(payload[42]-48) + 
        100*(payload[43]-48) + 
        10*(payload[44]-48) +
        1*(payload[45]-48)      
        );

        // Parse number of Satellites
    data.SATS = (
        10*(payload[46]-48) +
        1*(payload[47]-48)      
        );


    // If the latitude sign is 2, make the latitude negative
    if (data.Latitude_Sign == 2) {
        data.True_LAT = data.LAT * -1;
    }else if (data.Latitude_Sign == 1) {
        data.True_LAT = data.LAT * 1;
    }

    // If the longitude sign is 2, make the longitude negative
    if (data.Longitude_Sign == 2) {
        data.True_LONG = data.LONG * -1;
    }else if (data.Longitude_Sign == 1) {
        data.True_LONG = data.LONG * 1;
    }

    // If the temperature sign is 2, make the temperature negative
    if (data.Temperature_Sign == 2) {
    data.True_TEMP = data.TEMP * -1;
    }else if (data.Temperature_Sign == 1) {
        data.True_TEMP = data.TEMP * 1;
    }
    
    //Final Formatting of data
    LAT = data.True_LAT
    LONG = data.True_LONG
    SEA = data.SEA
    CO2 = data.CO2
    TEMP = data.True_TEMP
    RH = data.RH
    TIME = data.TIME
    SATS = data.SATS

  
  // Return the weather data as fields so that datacake can store them correctly
    return [ 
      //data: data,
        {
      field: "LAT",
      value: LAT
    },
    {
      field: "LONG",
      value: LONG
    },
    {
      field: "SEA",
      value: SEA
    },
    {
      field: "CO2",
      value: CO2
    },
    {
      field: "TEMP",
      value: TEMP
    },
    {
      field: "RH",
      value: RH
    },
    {
      field: "TIME",
      value: TIME
    },
    {
      field: "SATS",
      value: SATS
    }
    ];
  }