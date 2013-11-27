class Subject < ActiveRecord::Base
	belongs_to :module, :class_name => "Mod"
	
	has_many :lessons
end
