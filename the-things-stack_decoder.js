function decodeUplink(input) {
  // Initialize the data object
  var data = {};
  
  // Parse the latitude sign
  data.Latitude_Sign = parseInt(input.bytes[0]-48);

  // Parse the longitude sign
  data.Longitude_Sign = parseInt(input.bytes[1]-48);

  // Parse the temperature sign
  data.Temperature_Sign = parseInt(input.bytes[2]-48);

  // Parse the longitude
  data.LAT = (
    100*(input.bytes[3]-48) + 
    10*(input.bytes[4]-48) + 
    1*(input.bytes[5]-48) + 
    0.1*(input.bytes[6]-48) + 
    0.01*(input.bytes[7]-48) +
    0.001*(input.bytes[8]-48) +
    0.0001*(input.bytes[9]-48) +
    0.00001*(input.bytes[10]-48) +
    0.000001*(input.bytes[11]-48)
  );
  
  // Parse the latitude
  data.LONG = (
      100*(input.bytes[12]-48) + 
      10*(input.bytes[13]-48) + 
      1*(input.bytes[14]-48) + 
      0.1*(input.bytes[15]-48) + 
      0.01*(input.bytes[16]-48) +
      0.001*(input.bytes[17]-48) +
      0.0001*(input.bytes[18]-48) +
      0.00001*(input.bytes[19]-48) +
      0.000001*(input.bytes[20]-48)
  );
  
  // Parse height above sea level in metres
  data.SEA = (
    1000*(input.bytes[21]-48) + 
    100*(input.bytes[22]-48) + 
    10*(input.bytes[23]-48) + 
    1*(input.bytes[24]-48) + 
    0.1*(input.bytes[25]-48)
  );
  
  // Parse the environmental CO2 level in ppm
  data.CO2 = (
    1000*(input.bytes[26]-48) + 
    100*(input.bytes[27]-48) + 
    10*(input.bytes[28]-48) + 
    1*(input.bytes[29]-48) 
  );
  
  // Parse the temperature in degrees celsius
  data.TEMP = (
    100*(input.bytes[30]-48) + 
    10*(input.bytes[31]-48) + 
    1*(input.bytes[32]-48) + 
    0.1*(input.bytes[33]-48) + 
    0.01*(input.bytes[34]-48)
  );

  // Parse the humidity in %
  data.RH = (
      100*(input.bytes[35]-48) + 
      10*(input.bytes[36]-48) + 
      1*(input.bytes[37]-48) + 
      0.1*(input.bytes[38]-48) + 
      0.01*(input.bytes[39]-48)
    );

  // Parse UTC Time Hours:Minutes:Seconds
  data.TIME = (
    100000*(input.bytes[40]-48) + 
    10000*(input.bytes[41]-48) + 
    1000*(input.bytes[42]-48) + 
    100*(input.bytes[43]-48) + 
    10*(input.bytes[44]-48) +
    1*(input.bytes[45]-48)      
  );
  
      // Parse number of Satellites
  data.SATS = (
    10*(input.bytes[46]-48) +
    1*(input.bytes[47]-48)      
  );
  
  
  // If the latitude sign is 2, make the latitude negative
  if (data.Latitude_Sign == 2) {
      data.True_LAT = data.LAT * -1;
    }

  // If the longitude sign is 2, make the longitude negative
  if (data.Longitude_Sign == 2) {
      data.True_LONG = data.LONG * -1;
    }

  // If the temperature sign is 2, make the temperature negative
  if (data.Temperature_Sign == 2) {
    data.True_TEMP = data.TEMP * -1;
  }
  
  // Return the data object
  return {
    data: data,
  };
}