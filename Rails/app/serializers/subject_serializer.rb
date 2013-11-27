class SubjectSerializer < ActiveModel::Serializer
  attributes :id, :label

  has_one :module
end
