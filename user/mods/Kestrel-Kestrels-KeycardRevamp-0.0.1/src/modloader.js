exports.mod = (mod_data) => {
    logger.logInfo(`[MOD] ${mod_data.name} initializing...`);
	let ModFolderName = `${mod_data.author}-${mod_data.name}-${mod_data.version}`;
	let ModFolders = mod_data.folders;
	let ModFileNames = mod_data.filenames;
	let PathResolver = global.internal.path.resolve;
	let items = global.fileIO.readParsed(PathResolver('user/cache/items.json'));
	let assort_ragfair = global.fileIO.readParsed(PathResolver('user/cache/assort_ragfair.json'));
	let locale_en = global.fileIO.readParsed(PathResolver('user/cache/locale_en.json'));
	let templates = global.fileIO.readParsed(PathResolver('user/cache/templates.json'));
	let tDataBase = {};

	for(let folder of ModFolders)
	{
		tDataBase[folder] = {};
		for(let file of ModFileNames)
		{
			let fileData = global.fileIO.readParsed(PathResolver(`user/mods/${ModFolderName}/${folder}/${file}.json`));
			
			tDataBase[folder][file] = fileData;
		}
	}
	for(let item in tDataBase["files/traders/ragfair"])
	{
		let itemData = tDataBase["files/traders/ragfair"][item];
		let pricingData = tDataBase["files/templates"][item].Price;
		assort_ragfair.data.items.push(itemData);
		assort_ragfair.data.barter_scheme[itemData._id] = [[{"count":pricingData,"_tpl":"5449016a4bdc2d6f028b456f"}]];
		assort_ragfair.data.loyal_level_items[itemData._id] = 1;
	}
	for(let item in tDataBase["files/items"])
	{
		let itemData = tDataBase["files/items"][item];
		items.data[item] = itemData;
	}
	for(let item in tDataBase["files/locales/en"])
	{
		let itemData = tDataBase["files/locales/en"][item];
		locale_en.templates[item] = itemData;
	}
	for(let item in tDataBase["files/templates"])
	{
		templates.data.Items.push(tDataBase["files/templates"][item]);
	}
	
	fileIO.write(PathResolver('user/cache/items.json'), items, true);
	fileIO.write(PathResolver('user/cache/assort_ragfair.json'), assort_ragfair, true);
	fileIO.write(PathResolver('user/cache/locale_en.json'), locale_en, true);
	fileIO.write(PathResolver('user/cache/templates.json'), templates, true);
	
	logger.logSuccess(`[MOD] ${mod_data.name}; Ready for pain!`);
}