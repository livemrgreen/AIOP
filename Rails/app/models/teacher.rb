class Teacher < ActiveRecord::Base
	belongs_to :user, :dependent => :delete

	has_many :modules, :class_name => "Mod", :foreign_key => "teacher_id"
	has_many :teachings
end
