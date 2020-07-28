jQuery(document).ready(function()
{
	// Instantiate the Typeahead UI
	jQuery("[name='life_name']").typeahead
	(
		{
			minLength: 1,
			highlight: true,
			classNames:
			{
				dataset: 'list-group',
				suggestion: 'list-group-item',
				cursor: 'active',
			}
		},
		{
			source: new Bloodhound
			({
				initialize: true,
				datumTokenizer: Bloodhound.tokenizers.whitespace,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				remote:
				{
					url: './',
					prepare: function (query, settings) {
						settings.url = 'search.json?q=' + query;
						return settings;
					},
					rateLimitWait: 5,
					filter: function (entities)
					{
						return $.map(entities, function (entity)
						{
							return entity;
						});
					}
				}
			}).ttAdapter(),
			limit: 10,
			displayKey: 'value',
			templates:
			{
				empty: [
					'<div class="list-group-item">',
					'Kan ikke finde nogle virksomheder eller personer.',
					'</div>'
				].join('\n'),

				suggestion: function (entity)
				{
					return '<span class="result">\
						<span class="name">\
							' + entity.life.name + '\
						</span>\
					</span>';
				}
			}
		}
	);

	// Listener on select
	jQuery("[name='life_name']").bind('typeahead:select', function (error, entity)
	{
		var attrName = jQuery(this).attr("name");

		if(attrName == 'life_name')
			jQuery(this).typeahead("val", entity.life.name);

		jQuery(this).typeahead('close');
	});

	// Remove
	jQuery(".tt-hint").remove();
	jQuery(".twitter-typeahead").attr("style", "");
});