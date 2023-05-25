package pt.unl.fct.di.smartbathroom.domain

import jakarta.persistence.*
import jdk.jfr.Threshold

@Entity
@Table(name = "slots")
data class SlotsDAO(
        @Id
        val id: Long,

        //@ManyToOne(cascade = [CascadeType.ALL])
        val bathroomId: Long,
        val start: Double,
        val end: Double,
        var avai: Boolean,
        val code: String
)

@Entity
@Table(name = "bathroomdao")
data class BathroomDAO(
        @Id
        val id: Long,

        @OneToMany(cascade = [CascadeType.ALL])
        var slots: MutableCollection<SlotsDAO>,

        val temperatureThreshold: Long,
        val humidityThreshold: Long,
        var desembacador: Boolean,
        var aquecedor: Boolean,
        var currentTemperature: Long,
        var doorOpen: Boolean
)