class LessonSerializer < ActiveModel::Serializer
  attributes :id, :label

  has_one :lesson_type
end
