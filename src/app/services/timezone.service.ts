import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TimezoneService {
  constructor() {}
  
  getTimezoneArray() {
    let timezone  = [];
    timezone = this.timezoneArray;
    return timezone;
  }

	timezoneArray = [
		{ name: 'Afghanistan Standard Time', timezone: 'Asia/Kabul', standardName: '(GMT +04:30) Kabul' },
		{ name: 'Alaskan Standard Time', timezone: 'America/Anchorage', standardName: '(GMT -09:00) Alaska' },
		{ name: 'Arab Standard Time', timezone: 'Asia/Riyadh', standardName: '(GMT +03:00) Kuwait' },
		{ name: 'Arabian Standard Time', timezone: 'Asia/Dubai', standardName: '(GMT +04:00) Abu Dhabi' },
		{ name: 'Arabic Standard Time', timezone: 'Asia/Baghdad', standardName: '(GMT +03:00) Baghdad' },
		{
			name: 'Argentina Standard Time',
			timezone: 'America/Buenos_Aires',
			standardName: '(GMT -03:00) Buenos Aires'
		},
		{
			name: 'Atlantic Standard Time',
			timezone: 'America/Halifax',
			standardName: '(GMT -04:00) Atlantic Time (Canada)'
		},
		{ name: 'AUS Central Standard Time', timezone: 'Australia/Darwin', standardName: '(GMT +09:30) Darwin' },
		{ name: 'AUS Eastern Standard Time', timezone: 'Australia/Sydney', standardName: '(GMT +10:00) Canberra' },
		{ name: 'Azerbaijan Standard Time', timezone: 'Asia/Baku', standardName: '(GMT +04:00) Baku' },
		{ name: 'Azores Standard Time', timezone: 'Atlantic/Azores', standardName: '(GMT -01:00) Azores' },
		{ name: 'Bangladesh Standard Time', timezone: 'Asia/Dhaka', standardName: '(GMT +06:00) Dhaka' },
		{ name: 'Canada Central Standard Time', timezone: 'America/Regina', standardName: '(GMT -06:00) Saskatchewan' },
		{
			name: 'Cape Verde Standard Time',
			timezone: 'Atlantic/Cape_Verde',
			standardName: '(GMT -01:00) Cape Verde Is.'
		},
		{ name: 'Caucasus Standard Time', timezone: 'Asia/Yerevan', standardName: '(GMT +04:00) Yerevan' },
		{ name: 'Cen. Australia Standard Time', timezone: 'Australia/Adelaide', standardName: '(GMT +09:30) Adelaide' },
		{
			name: 'Central America Standard Time',
			timezone: 'America/Guatemala',
			standardName: '(GMT -06:00) Central America'
		},
		{ name: 'Central Asia Standard Time', timezone: 'Asia/Almaty', standardName: '(GMT +06:00) Astana' },
		{ name: 'Central Brazilian Standard Time', timezone: 'America/Cuiaba', standardName: '(GMT -04:00) Cuiaba' },
		{
			name: 'Central Europe Standard Time',
			timezone: 'Europe/Budapest',
			standardName: '(GMT +01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague'
		},
		{ name: 'Central European Standard Time', timezone: 'Europe/Warsaw', standardName: '(GMT +01:00) Sarajevo' },
		{
			name: 'Central Pacific Standard Time',
			timezone: 'Pacific/Guadalcanal',
			standardName: '(GMT +11:00) Solomon Is.'
		},
		{
			name: 'Central Standard Time (Mexico)',
			timezone: 'America/Mexico_City',
			standardName: '(GMT -06:00) Guadalajara'
		},
		{
			name: 'Central Standard Time',
			timezone: 'America/Chicago',
			standardName: '(GMT -06:00) Central Time (US & Canada)'
		},
		{ name: 'China Standard Time', timezone: 'Asia/Shanghai', standardName: '(GMT +08:00) Beijing' },
		{
			name: 'Dateline Standard Time',
			timezone: 'Etc/GMT+12',
			standardName: '(GMT -12:00) International Date Line West'
		},
		{ name: 'E. Africa Standard Time', timezone: 'Africa/Nairobi', standardName: '(GMT +03:00) Nairobi' },
		{ name: 'E. Australia Standard Time', timezone: 'Australia/Brisbane', standardName: '(GMT +10:00) Brisbane' },
		{ name: 'E. Europe Standard Time', timezone: 'Europe/Minsk', standardName: '(GMT +02:00) Minsk' },
		{
			name: 'E. South America Standard Time',
			timezone: 'America/Sao_Paulo',
			standardName: '(GMT -03:00) Brasilia'
		},
		{
			name: 'Eastern Standard Time',
			timezone: 'America/New_York',
			standardName: '(GMT -05:00) Eastern Time (US & Canada)'
		},
		{ name: 'Egypt Standard Time', timezone: 'Africa/Cairo', standardName: '(GMT +02:00) Cairo' },
		{
			name: 'Ekaterinburg Standard Time',
			timezone: 'Asia/Yekaterinburg',
			standardName: '(GMT +05:00) Ekaterinburg'
		},
		{ name: 'Fiji Standard Time', timezone: 'Pacific/Fiji', standardName: '(GMT +12:00) Fiji' },
		{
			name: 'FLE Standard Time',
			timezone: 'Europe/Kiev',
			standardName: '(GMT +02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'
		},
		{ name: 'Georgian Standard Time', timezone: 'Asia/Tbilisi', standardName: '(GMT +04:00) Tbilisi' },
		{ name: 'GMT Standard Time', timezone: 'Europe/London', standardName: '(GMT) Dublin' },
		{ name: 'Greenland Standard Time', timezone: 'America/Godthab', standardName: '(GMT -03:00) Greenland' },
		{ name: 'Greenwich Standard Time', timezone: 'Atlantic/Reykjavik', standardName: '(GMT) Monrovia' },
		{ name: 'GTB Standard Time', timezone: 'Europe/Istanbul', standardName: '(GMT +02:00) Athens' },
		{ name: 'Hawaiian Standard Time', timezone: 'Pacific/Honolulu', standardName: '(GMT -10:00) Hawaii' },
		{ name: 'India Standard Time', timezone: 'Asia/Kolkata', standardName: '(GMT +05:30) Chennai' },
		{ name: 'Iran Standard Time', timezone: 'Asia/Tehran', standardName: '(GMT +03:30) Tehran' },
		{ name: 'Israel Standard Time', timezone: 'Asia/Jerusalem', standardName: '(GMT +02:00) Jerusalem' },
		{ name: 'Western Indonesia Time', timezone: 'Asia/Jakarta', standardName: '(GMT+7) Indonesia' },
		{ name: 'Jordan Standard Time', timezone: 'Asia/Amman', standardName: '(GMT +02:00) Amman' },
		{
			name: 'Kamchatka Standard Time',
			timezone: 'Asia/Kamchatka',
			standardName: '(GMT +12:00) Petropavlovsk-Kamchatsky - Old'
		},
		{ name: 'Korea Standard Time', timezone: 'Asia/Seoul', standardName: '(GMT +09:00) Seoul' },
		{ name: 'Magadan Standard Time', timezone: 'Asia/Magadan', standardName: '(GMT +11:00) Magadan' },
		{ name: 'Mauritius Standard Time', timezone: 'Indian/Mauritius', standardName: '(GMT +04:00) Port Louis' },
		{ name: 'Mid-Atlantic Standard Time', timezone: 'Etc/GMT+2', standardName: '(GMT -02:00) Mid-Atlantic' },
		{ name: 'Middle East Standard Time', timezone: 'Asia/Beirut', standardName: '(GMT +02:00) Beirut' },
		{ name: 'Montevideo Standard Time', timezone: 'America/Montevideo', standardName: '(GMT -03:00) Montevideo' },
		{ name: 'Morocco Standard Time', timezone: 'Africa/Casablanca', standardName: '(GMT) Casablanca' },
		{
			name: 'Mountain Standard Time (Mexico)',
			timezone: 'America/Chihuahua',
			standardName: '(GMT -07:00) Chihuahua'
		},
		{
			name: 'Mountain Standard Time',
			timezone: 'America/Denver',
			standardName: '(GMT -07:00) Mountain Time (US & Canada)'
		},
		{ name: 'Myanmar Standard Time', timezone: 'Asia/Rangoon', standardName: '(GMT +06:30) Yangon (Rangoon)' },
		{
			name: 'N. Central Asia Standard Time',
			timezone: 'Asia/Novosibirsk',
			standardName: '(GMT +06:00) Novosibirsk'
		},
		{ name: 'Namibia Standard Time', timezone: 'Africa/Windhoek', standardName: '(GMT +02:00) Windhoek' },
		{ name: 'Nepal Standard Time', timezone: 'Asia/Katmandu', standardName: '(GMT +05:45) Kathmandu' },
		{ name: 'New Zealand Standard Time', timezone: 'Pacific/Auckland', standardName: '(GMT +12:00) Auckland' },
		{ name: 'Newfoundland Standard Time', timezone: 'America/St_Johns', standardName: '(GMT -03:30) Newfoundland' },
		{ name: 'North Asia East Standard Time', timezone: 'Asia/Irkutsk', standardName: '(GMT +08:00) Irkutsk' },
		{ name: 'North Asia Standard Time', timezone: 'Asia/Krasnoyarsk', standardName: '(GMT +07:00) Krasnoyarsk' },
		{ name: 'Pacific SA Standard Time', timezone: 'America/Santiago', standardName: '(GMT -04:00) Santiago' },
		{
			name: 'Pacific Standard Time (Mexico)',
			timezone: 'America/Tijuana',
			standardName: '(GMT -08:00) Baja California'
		},
		{
			name: 'Pacific Standard Time',
			timezone: 'America/Los_Angeles',
			standardName: '(GMT -08:00) Pacific Time (US & Canada)'
		},
		{ name: 'Pakistan Standard Time', timezone: 'Asia/Karachi', standardName: '(GMT +05:00) Islamabad' },
		{ name: 'Paraguay Standard Time', timezone: 'America/Asuncion', standardName: '(GMT -04:00) Asuncion' },
		{ name: 'Romance Standard Time', timezone: 'Europe/Paris', standardName: '(GMT +01:00) Brussels' },
		{ name: 'Russian Standard Time', timezone: 'Europe/Moscow', standardName: '(GMT +03:00) Moscow' },
		{ name: 'SA Eastern Standard Time', timezone: 'America/Cayenne', standardName: '(GMT -03:00) Cayenne' },
		{ name: 'SA Pacific Standard Time', timezone: 'America/Bogota', standardName: '(GMT -05:00) Bogota' },
		{ name: 'SA Western Standard Time', timezone: 'America/La_Paz', standardName: '(GMT -04:00) Georgetown' },
		{ name: 'Samoa Standard Time', timezone: 'Pacific/Apia', standardName: '(GMT -11:00) Samoa' },
		{ name: 'SE Asia Standard Time', timezone: 'Asia/Bangkok', standardName: '(GMT +07:00) Bangkok' },
		{ name: 'Singapore Standard Time', timezone: 'Asia/Singapore', standardName: '(GMT +08:00) Kuala Lumpur' },
		{ name: 'South Africa Standard Time', timezone: 'Africa/Johannesburg', standardName: '(GMT +02:00) Harare' },
		{ name: 'Sri Lanka Standard Time', timezone: 'Asia/Colombo', standardName: '(GMT +05:30) Sri Jayawardenepura' },
		{ name: 'Syria Standard Time', timezone: 'Asia/Damascus', standardName: '(GMT +02:00) Damascus' },
		{ name: 'Taipei Standard Time', timezone: 'Asia/Taipei', standardName: '(GMT +08:00) Taipei' },
		{ name: 'Tasmania Standard Time', timezone: 'Australia/Hobart', standardName: '(GMT +10:00) Hobart' },
		{ name: 'Tokyo Standard Time', timezone: 'Asia/Tokyo', standardName: '(GMT +09:00) Osaka' },
		{ name: 'Tonga Standard Time', timezone: 'Pacific/Tongatapu', standardName: '(GMT +13:00) Nuku alofa' },
		{ name: 'Ulaanbaatar Standard Time', timezone: 'Asia/Ulaanbaatar', standardName: '(GMT +08:00) Ulaanbaatar' },
		{
			name: 'US Eastern Standard Time',
			timezone: 'America/Indianapolis',
			standardName: '(GMT -05:00) Indiana (East)'
		},
		{ name: 'US Mountain Standard Time', timezone: 'America/Phoenix', standardName: '(GMT -07:00) Arizona' },
		{ name: 'GMT ', timezone: 'Etc/GMT', standardName: '(GMT) Coordinated Universal Time' },
		{ name: 'GMT +12', timezone: 'Etc/GMT-12', standardName: '(GMT +12:00) Coordinated Universal Time+12' },
		{ name: 'GMT -02', timezone: 'Etc/GMT+2', standardName: '(GMT -02:00) Coordinated Universal Time-02' },
		{ name: 'GMT -11', timezone: 'Etc/GMT+11', standardName: '(GMT -11:00) Coordinated Universal Time-11' },
		{ name: 'Venezuela Standard Time', timezone: 'America/Caracas', standardName: '(GMT -04:30) Caracas' },
		{ name: 'Vladivostok Standard Time', timezone: 'Asia/Vladivostok', standardName: '(GMT +10:00) Vladivostok' },
		{ name: 'W. Australia Standard Time', timezone: 'Australia/Perth', standardName: '(GMT +08:00) Perth' },
		{
			name: 'W. Central Africa Standard Time',
			timezone: 'Africa/Lagos',
			standardName: '(GMT +01:00) West Central Africa'
		},
		{
			name: 'W. Europe Standard Time',
			timezone: 'Europe/Berlin',
			standardName: '(GMT +01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
		},
		{ name: 'West Asia Standard Time', timezone: 'Asia/Tashkent', standardName: '(GMT +05:00) Tashkent' },
		{ name: 'West Pacific Standard Time', timezone: 'Pacific/Port_Moresby', standardName: '(GMT +10:00) Guam' },
		{ name: 'Yakutsk Standard Time', timezone: 'Asia/Yakutsk', standardName: '(GMT +09:00) Yakutsk' }
	];
}
