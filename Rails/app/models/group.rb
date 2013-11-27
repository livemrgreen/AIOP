class Group < ActiveRecord::Base
	belongs_to :parent, :class_name => "Group", :foreign_key => "parent_id"

	has_many :teachings
	has_many :children, :class_name => "Group", :foreign_key => "child_id"
end
