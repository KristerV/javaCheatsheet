Template.diagram.helpers({
	node: function() {
		return Nodes.find()
	},
	size: function() {
		return 3 / this.importance
	},
	lineStyle: function() {

	}
})

Template.diagram.rendered = function() {
	Meteor.setTimeout(function(){
		$('.node').each(function(){
			if ($(this).attr('data-parent')) {
				var parentId = $(this).attr('data-parent')
				Node.makeLine(this.id, parentId)
			}
		})
	},1100)
}

Node = {
	getLineStyle: function(id1, parentId) {
		node1 = $('#'+id1)
		node2 = $('#'+parentId)
		if (!node2 || !node1)
			return false

		node1offset = node1.offset()
		node2offset = node2.offset()
		node1height = node1.height()
		node2height = node2.height()
		node1width = node1.width()
		node2width = node2.width()
		node1centerx = node1offset.left + node1width
		node2centerx = node2offset.left + node2width
		node1centery = node1offset.top + node1height
		node2centery = node2offset.top + node2height

		var a = node1centerx - node2centerx
		var b = node1centery - node2centery
		var width = Math.sqrt(a*a + b*b)
		//var top = Math.min(node1centery, node2centery)
		//var left = Math.min(node1centerx, node2centerx)

		// Rotation
		rotation = Math.atan2(b, a);
		rotation *= 180/Math.PI
		rotation += 180

		return {
			width: width,
			rotation: rotation,
			top: node1centery,
			left: node1centerx,
		}
	},
	makeLine: function(id1, id2) {
		var style = Node.getLineStyle(id1, id2)
		var lineStyle = 'width:'+style.width+'px;transform:rotate('+style.rotation+'deg);top:'+style.top+'px;left:'+style.left+'px;'
		$('.diagram').append('<div class="line" style="'+lineStyle+'"></div>')
	}
}
