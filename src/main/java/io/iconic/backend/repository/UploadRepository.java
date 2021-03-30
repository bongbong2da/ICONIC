package io.iconic.backend.repository;

import io.iconic.backend.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadRepository extends JpaRepository<Image, Integer> {

    Image getByImageUuid(String uuid);

}
